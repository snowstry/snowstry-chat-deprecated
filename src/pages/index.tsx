import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { Navbar } from "@frontend/components/Nav";
import { UsernamePopup } from "@frontend/components/UsernamePopup";
import log from "@shared/logger";
import Pusher from "pusher-js";
import axios from 'axios'

export default function Home() {
	const { data: session } = useSession();
	const [showUsernameInput, setShowUsernameInput] = useState(false);
	const [username, setUsername] = useState();
	const [chats, setChats] = useState([]);
	const myEmail = session?.user.email;
	const name = session?.user.name;
	const pfp = session?.user.image;
	const messageField = useRef(null)

	useEffect(() => {
		// Pusher.logToConsole = true;

		const pusher = new Pusher('cd903e7b8276fdcb30a5', {
			cluster: 'ap2'
		});

		const channel = pusher.subscribe('chat');
		channel.bind('chat-event', function (data) {
			setChats((prevState) => [
				...prevState,
				{ sender: data.sender, message: data.message },
			])
			console.log("sfsf", data)
		});
		console.log(chats)
		return () => {
			pusher.unsubscribe("chat")
		}
	})

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (messageField.current.value === '') return;
		const message = messageField.current.value
		messageField.current.value = ''
		await axios.post('/api/pusher', { message: message, username })
	}

	useEffect(() => {
		fetch("/api/profileSetup", {
			body: JSON.stringify({ pfp, name, myEmail, add: false }),
			method: "POST",
		}).then(async (res) => {
			var user = await res.json();
			if (user.success === false) {
				setShowUsernameInput(true);
			}
		});
	}, [session, showUsernameInput, myEmail, name, pfp]);

	useEffect(() => {
		fetch("/api/getUserdata", {
			body: JSON.stringify({ myEmail }),
			method: "POST",
		}).then(async (res) => {
			setUsername(await res.json());
		});
	}, [session, showUsernameInput, myEmail]);

	const links = [
		{ id: "1", text: "Friends", path: "/friends" },
		{
			id: "2",
			text: "Profile",
			//@ts-ignore
			path: `/profile/${username?.user?.username}`,
		},
	];

	log.debug(showUsernameInput);
	return (
		<div>
			<Head>
				<title>Home</title>
				<meta
					name="description"
					content="Snowstry, A chat app designed with simplicity and good user experience in mind."
				/>
				<script src="https://cdn.tailwindcss.com"></script>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Navbar links={links} />
				{log.debug(showUsernameInput)}
				{showUsernameInput && (
					<UsernamePopup activate={showUsernameInput} />
				)}
				{/* <h1 className="text-center text-nord_light-300 font-bold text-xl pt-10">
					Welcome {session?.user.name}
				</h1> */}
				<div className="container mx-auto">
					<div className="w-full  rounded">
						<div className="hidden lg:col-span-2 lg:block">
							<div className="w-full">
								<div className="relative flex items-center p-3 border-b border-gray-300">
									<img className="object-cover w-10 h-10 rounded-full"
										src="/favicon.ico" alt="username" />
									<span className="block ml-2 font-bold text-nord_dark-500">Snowstry Public Chat</span>
									<span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
									</span>
								</div>
								<div className="relative w-full p-6 overflow-y-auto h-[40rem]">
									<ul className="space-y-2">
										{chats.map((chat, id) => {
												return(
												chat.sender.email === session?.user.email ? (
													<>
														{/* <p dir="rtl">{chat.message}</p>
														<small dir="rtl">{chat.sender.name}</small> */}
														<li className="flex justify-end">
															<div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
																<strong className="text-black ">{chat.sender.name}</strong>
																<span className="block">{chat.message}</span>
															</div>
															
														</li>
													</>
												) : (
													<>
														{/* <p>{chat.message}</p>
														<small>{chat.sender.name}</small> */}
														<li className="flex justify-start">
															<div className="relative max-w-xl px-4 py-2 text-white bg-nord_dark-400 rounded shadow">
																<strong className="text-white">{chat.sender.name}</strong>
																<span className="block">{chat.message}</span>
															</div>
														</li>
													</>
												)
											)
										})}
									</ul>
								</div>

								<div className="flex items-center justify-between w-full p-3 border-t border-nord_black-400">
									<form onSubmit={(e) => { handleSubmit(e) }} className="items w-full inline-flex">
										<input type="text" placeholder="Message"
											ref={messageField}
											className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
											name="message" required />
										<button type="submit">
											<svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20" fill="currentColor">
												<path
													d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
											</svg>
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <div classNameName="list-group list-group-flush border-bottom scrollarea" style={{minHeight: "500px"}}>
					{chats.map((chat, id) => {
						return(
							chat.sender.email === session?.user.email ? (
								<>
									<p dir="rtl">{chat.message}</p>
									<small dir="rtl">{chat.sender.name}</small>
								</>
							) : (
								<>
									<p>{chat.message}</p>
									<small>{chat.sender.name}</small>
								</>
							)
						)
					})}
				</div>

				<form onSubmit={(e) => { handleSubmit(e) }}>
					<input
					 	ref={messageField}
						classNameName="form-control"
						type="text"
						placeholder="Message"
					/>
				</form> */}
			</main>
		</div>
	);
}
