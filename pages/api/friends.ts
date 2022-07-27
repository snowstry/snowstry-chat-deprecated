import connectDB from "../../middleware/mongodb";
import User from "../../models/User";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var email = JSON.parse(req.body).email;
		var name = JSON.parse(req.body).name;
		console.log(email);
		console.log(name);

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
					friends
				})
				await newUser.save().then((user) => {
					console.log("Registered New User To DB");
					const friends = user.friends
					return res
					.status(200)
					.json({
						msg: "Registered This User and returned data",
						friends: friends,
					});
				})
				
			} else {
				return res
					.status(200)
					.json({
						msg: "User was already in DB and returned their data",
						friends: user.friends.friends,
					});
			}
		});
	}
};

export default connectDB(handler);
