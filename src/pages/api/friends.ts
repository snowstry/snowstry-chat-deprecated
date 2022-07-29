import connectDB from "@backend/middleware/mongodb";
import User from "@backend/models/User";
import log from "@shared/logger";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var email = JSON.parse(req.body).email;

		User.findOne({ email: email }).then(async (user) => {
			log.debug(user);
			if (!user) {
				return res.status(200).json({
					msg: "User does not exist, need to complete profile setup.",
					friends: null,
				});
			} else {
				return res.status(200).json({
					msg: "User was already in DB and returned their data.",
					friends: user.friends,
				});
			}
		});
	}
};

export default connectDB(handler);
