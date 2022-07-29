import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import Image from "next/image";

export const Navbar = ({ links }) => {
	const { data: session } = useSession();
	const [active, setActive] = useState(false);
	const [users, setData] = useState(null);
	const [query, setQuery] = useState("");
	const [showModal, setShowModal] = useState(false);

	const findUser = (e: any) => {
		setQuery(e.target.value);
		console.log(query);
		if (query.length < 1) return;
		fetch("/api/userSearch", {
			body: JSON.stringify({ query }),
			method: "POST",
		}).then(async (res) => {
			if (!query.length) return;
			console.log("hi");
			setData(await res.json());
		});
	};

	const handleClick = () => {
		setActive(!active);
	};
	const linkList = links.map((link: any) => {
		return (
			<Link key={link.id} href={link.path}>
				<a
					className={`lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-lg text-nord_light-300 items-center justify-center hover:bg-nord_dark-300`}
				>
					{link.text}
				</a>
			</Link>
		);
	});
	return (
		<>
			<nav className="flex items-center flex-wrap bg-nord_dark-400 pl-2 pr-2 text-nord_light-300 font-jetbrains">
				<Link href="/">
					<a className="inline-flex items-center p-2 mr-4 ">
						<Image
							className="h-12 w-12 rounded-full"
							src={session?.user.image}
							alt="Profile picture"
							height={50}
							width={50}
						/>
						<p className="pl-4 pt-2">{session?.user.name}</p>
					</a>
				</Link>
				<button
					className="bg-nord_dark-300 p-3 rounded-full mt-1 outline-none"
					onClick={() => setShowModal(true)}
				>
					<FaSearch />
				</button>
				{showModal ? (
					<>
						<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none">
							<div className="relative w-auto my-6 mx-auto max-w-3xl drop-shadow-xl">
								<div className="rounded-lg relative flex flex-col w-full bg-nord_dark-400 outline-none">
									<div className="flex items-start justify-between">
										<p className="text-nord_dark-100 mt-5 ml-5">
											Search users
										</p>
										<button
											className="float-right"
											onClick={() => setShowModal(false)}
										>
											<span className="block text-nord_dark-100 rounded-full text-xl mt-5 mr-5">
												<FaWindowClose />
											</span>
										</button>
									</div>
									<div className="relative p-6 flex-auto">
										<input
											onChange={findUser}
											className="bg-nord_dark-200 outline-none rounded-lg pt-2 pb-2 pl-4 pr-4"
											placeholder="Search"
										></input>
										<ul>
											{users !== null &&
												query.length > 1 &&
												(console.log("here"),
												users.user.map(
													(people: any) => (
														<li
															key={people.name}
															className="bg-nord_dark-300 mt-2 p-2 rounded-lg"
														>
															<Link
																id="suggestedUser"
																href={`/profile/${people.name}`}
															>
																<button
																	onClick={() =>
																		setShowModal(
																			false
																		)
																	}
																>
																	{
																		people.name
																	}
																</button>
															</Link>
														</li>
													)
												))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</>
				) : null}

				<button
					className=" inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
					onClick={handleClick}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<div
					className={`${
						active ? "" : "hidden"
					}   w-full lg:inline-flex lg:flex-grow text-center lg:w-auto`}
				>
					<div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
						{linkList}
						<Link href="/">
							<a
								onClick={(e) => {
									e.preventDefault();
									//@ts-ignore
									signOut("github");
								}}
								className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-lg text-white items-center justify-center hover:bg-nord_dark-300 text-nord_red"
							>
								Log out
							</a>
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
};
