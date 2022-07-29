import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useCallback } from "react";
import { useEffect } from "react";

export const UsernamePopup = ({ activate }) => {
	const { data: session } = useSession();
	const name = session?.user.name;
	const email = session?.user?.email;
	const pfp = session?.user.image;
	var [usernameResult, setUsername] = useState();
	var [errorMessage, setError] = useState("");
	var [active, setActive] = useState(activate);

	const getUsername = (event) => {
		event.preventDefault();
		var username = event.target.elements.username.value;
		fetch("/api/profileSetup", {
			body: JSON.stringify({ email, username, name, pfp, add: true }),
			method: "POST",
		}).then(async (res) => {
			setUsername(await res.json());
			console.log(`helloo`, usernameResult);
			console.log(usernameResult?.msg);
		});
	};
	useEffect(() => {
		setError(usernameResult?.msg);
		if (usernameResult?.success === true) {
			setActive(false);
		}
		setTimeout(function () {
			setError("");
		}, 3000);
	}, [usernameResult]);

	console.log(active);
	console.log(usernameResult, "he");
	console.log(errorMessage);
	return (
		<>
			{active ? (
				<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none">
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
									<button
										type="submit"
										className="bg-nord_dark-200 p-2 mt-4 rounded-lg float-right"
									>
										Submit
									</button>
									<p>{usernameResult && errorMessage}</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};
