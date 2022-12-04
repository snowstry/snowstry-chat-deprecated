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
		channel.bind('chat-event', function(data) {
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
								{/* <div className="relative flex items-center p-3">
									<img className="object-cover w-10 h-10 rounded-full"
										src="/favicon.ico" alt="username" />
									<span className="block ml-2 text-nord_light-300">Snowstry Public Chat</span>
								</div> */}
								<div className="relative w-full p-6 overflow-y-auto h-[30rem]">
									<ul className="space-y-2">
										<li className="flex justify-end">
											<div className="relative px-4 py-2 text-nord_light-300 bg-nord_dark-100 rounded shadow">
												<strong className="text-nord_light-300 ">Shubham</strong>
												<span className="block">Hi</span>
											</div>
										</li>
										<li className="flex justify-start">
											<div className="relative px-4 py-2 text-nord_light-300 bg-nord_dark-400 rounded shadow">
												<strong className="text-nord_light-300 ">Wix Logo</strong>
												<span className="block">Hello</span>
											</div>
										</li>
										<li className="flex justify-end">
											<div className="relative px-4 py-2 text-nord_light-300 bg-nord_dark-100 rounded shadow">
												<strong className="text-nord_light-300 ">Shubham</strong>
												<span className="block">Welcome to snowstry, a chat app designed with simplicity and good user experience in mind</span>
											</div>
										</li>
										<li className="flex justify-start">
											<div className="relative px-4 py-2 text-nord_light-300 bg-nord_dark-400 rounded shadow">
												<strong className="text-nord_light-300 ">Wix Logo</strong>
												<span className="block">OH wow!</span>
											</div>
										</li>
										<li className="flex justify-end">
											<div className="relative px-4 py-2 text-nord_light-300 bg-nord_dark-100 rounded shadow">
												<strong className="text-nord_light-300 ">Shubham</strong>
												<span className="block">And it is open sourced too!</span>
											</div>
										</li>
										{chats.map((chat, id) => {
											return (
												chat.sender.email === session?.user.email ? (
													<>
														{/* <p dir="rtl">{chat.message}</p>
														<small dir="rtl">{chat.sender.name}</small> */}
														<li className="flex justify-end">
															<div className="relative px-4 py-2 text-nord_light-300 bg-nord_dark-100 rounded shadow">
																<strong className="text-nord_light-300 ">{chat.sender.name}</strong>
																<span className="block">{chat.message}</span>
															</div>
														</li>
													</>
												) : (
													<>
														{/* <p>{chat.message}</p>
														<small>{chat.sender.name}</small> */}
														<li className="flex justify-start">
															<div className="relative max-w-xl px-4 py-2 text-nord_light-300 bg-nord_dark-400 rounded shadow">
																<strong className="text-nord_light-300">{chat.sender.name}</strong>
																<span className="block">{chat.message}</span>
															</div>
														</li>
													</>
												)
											)
										})}
									</ul>
								</div>

								<div className="flex items-center justify-between w-full p-3 text-nord_light-300">
									<form onSubmit={(e) => { handleSubmit(e) }} className="items w-full inline-flex">
										<input type="text" placeholder="Message"
											autoComplete="off"
											ref={messageField}
											className="block w-full py-2 pl-4 mx-3 bg-nord_dark-100 rounded-lg text-nord_light-300 bg-nord_dark-100 outline-none"
											name="message" required />
										<button type="submit">
											<svg className="w-5 h-5 text-nord_blue-400 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
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
			</main>
		</div>
	);
}
