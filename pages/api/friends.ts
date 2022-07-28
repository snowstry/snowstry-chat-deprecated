import connectDB from "../../middleware/mongodb";
import User from "../../models/User";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var email = JSON.parse(req.body).email;
		var name = JSON.parse(req.body).name;
		var pfp = JSON.parse(req.body).pfp
		console.log(email);
		console.log(name);
		console.log(pfp);

		if (email === undefined) return;
		const friends = {
			Incoming: [],
			Outgoing: [],
			friends: [],
		};
		User.findOne({ email: email }).then(async (user) => {
			console.log(user);
			if (!user) {
				const newUser = new User({
					name,
					email,
					friends,
					pfp,
				});
				await newUser.save().then((user) => {
					console.log("Registered New User To DB");
					const friends = user.friends.friends;
					return res.status(200).json({
						msg: "Registered This User and returned data",
						friends: friends,
					});
				});
			} else {
				return res.status(200).json({
					msg: "User was already in DB and returned their data",
					friends: user.friends.friends,
				});
			}
		});
	}
};

export default connectDB(handler);
