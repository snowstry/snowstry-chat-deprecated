import connectDB from "@backend/middleware/mongodb";
import User from "@backend/models/User";
import log from "@shared/logger";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var email = JSON.parse(req.body).myEmail;
		var username = JSON.parse(req.body).username;
		var usernameRegexed = new RegExp(["^", username, "$"].join(""), "i");

		var name = JSON.parse(req.body).name;
		var pfp = JSON.parse(req.body).pfp;
		var add = JSON.parse(req.body).add;
		log.debug(username, email, name, pfp);

		if (add === true) {
			if (!email || !username || !name || !pfp)
				return log.debug("no data");
			if (username.length > 20) {
				return res.status(200).json({
					success: false,
					msg: "Username cannot be bigger than 20 characters",
				});
			}
			if (username.indexOf(" ") >= 0) {
				return res.status(200).json({
					success: false,
					msg: "Username cannot have spaces",
				});
			}
			if (username === name) {
				return res.status(200).json({
					success: false,
					msg: "Username cannot be same as nickname",
				});
			}
		}
		if (!email) return;
		const friends = {
			Incoming: [],
			Outgoing: [],
			friends: [],
		};
		User.findOne({ email: email }).then((user) => {
			log.debug(user);
			if (!user) {
				if (add === true) {
					User.findOne({ username: usernameRegexed }).then(
						async (user) => {
							if (user) {
								log.debug(user);
								log.error("Username already taken.");
								return res.status(200).json({
									success: false,
									msg: "Username Already Exists",
								});
							} else {
								const newUser = new User({
									name,
									username,
									email,
									friends,
									pfp,
								});
								await newUser.save().then((user) => {
									log.debug("Registered New User To DB.");

									return res.status(200).json({
										success: true,
										msg: "Username pushed",
									});
								});
							}
						}
					);
				} else {
					return res.status(200).json({
						success: false,
						user: null,
					});
				}
			} else {
				log.info("\ncurrent name:", name, "\nname in database:",user.name)
				if(name !== user.name){
					User.findOneAndUpdate({email:email}, {name:name}).then(() => {
						console.log("renamed name cuz new name in session detected")
					})
				}
				else if(pfp !== user.pfp){
					User.findOneAndUpdate({email:email}, {pfp:pfp}).then(() => {
						console.log("changed profile cuz new profile in session detected")
					})
				}
				log.debug("User already exists.");
				return res.status(200).json({
					success: true,
					user: user,
				});
			}
		});
	}
};

export default connectDB(handler);
