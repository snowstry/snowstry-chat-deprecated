import connectDB from "@backend/middleware/mongodb";
import User from "@backend/models/User";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var email = JSON.parse(req.body).email;
		if (!email) return;
		User.findOne({ email: email }).then((user) => {
			if (!user) {
				return res.status(200).json({
					success: false,
					user: null,
				});
			} else {
				return res.status(200).json({
					success: true,
					user: user,
				});
			}
		});
	}
};

export default connectDB(handler);
