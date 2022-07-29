import connectDB from "@backend/middleware/mongodb";
import User from "@backend/models/User";
import log from "@shared/logger";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var searchedName = new RegExp(
			["^", JSON.parse(req.body).searchedName, "$"].join(""),
			"i"
		);
		var myName = JSON.parse(req.body).myName;
		log.debug(searchedName, myName);

		if (searchedName === undefined) return;
		User.findOne({ name: searchedName }).then((user) => {
			log.debug(user);
			if (!user) {
				return res.status(200).json({
					success: false,
					msg: "No User Exists With That Name",
					user: null,
				});
			} else {
				return res.status(200).json({
					msg: "User exists in db and returned their data",
					user: user,
				});
			}
		});
	}
};

export default connectDB(handler);
