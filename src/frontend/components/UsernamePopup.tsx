import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import log from "@shared/logger";

export const UsernamePopup = ({ activate }) => {
	const { data: session } = useSession();
	const name = session?.user.name;
	const myEmail = session?.user.email;
	const pfp = session?.user.image;
	var [usernameResult, setUsername] = useState();
	var [errorMessage, setError] = useState("");
	var [active, setActive] = useState(activate);

	const getUsername = (event) => {
		event.preventDefault();
		var username = event.target.elements.username.value;
		fetch("/api/profileSetup", {
			body: JSON.stringify({ myEmail, username, name, pfp, add: true }),
			method: "POST",
		}).then(async (res) => {
			setUsername(await res.json());
			log.debug(`Username result:`, usernameResult);
			if (!usernameResult) {
				log.debug("No result");
			} else {
				log.debug(usernameResult["msg"]);
			}
		});
	};
	useEffect(() => {
		// @ts-ignore
		setError(usernameResult?.msg);
		// @ts-ignore
		if (usernameResult?.success === true) {
			setActive(false);
		}
		setTimeout(function () {
			setError("");
		}, 3000);
	}, [usernameResult]);

	return (
		<>
			{active ? (
				<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none text-nord_light-300">
					<div className="relative w-auto my-6 mx-auto max-w-3xl drop-shadow-xl">
						<div className="rounded-lg relative flex flex-col w-full bg-nord_dark-400 outline-none">
							<div className="flex items-start justify-between">
								<p className="text-nord_dark-100 mt-5 ml-5">
									Enter a username
								</p>
							</div>
							<div className="relative p-6 flex-auto">
								<form onSubmit={getUsername}>
									<input
										name="username"
										type="text"
										className="bg-nord_dark-200 outline-none rounded-lg pt-2 pb-2 pl-4 pr-4"
										placeholder="Choose wisely"
									></input>

									<p className="mt-2">
										{usernameResult && errorMessage}
									</p>
									<button
										type="submit"
										className="bg-nord_dark-200 p-2 mt-4 rounded-lg float-right"
									>
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};
