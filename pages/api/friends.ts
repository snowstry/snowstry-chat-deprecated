import connectDB from "@backend/middleware/mongodb";
import User from "@backend/models/User";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var email = JSON.parse(req.body).email;

		User.findOne({ email: email }).then(async (user) => {
			console.log(user);
			if (!user) {
				return res.status(200).json({
					msg: "User doesnt exists need to complete profile setup",
					friends: null,
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
