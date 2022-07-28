import connectDB from "../../middleware/mongodb";
import User from "../../models/User";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var query = new RegExp(["^",JSON.parse(req.body).query].join(""), "i");
        if(!query) return;
		User.find({ "name" : query }).then((users) => {

            if (!users) {
				return res
                    .status(200)
                    .json({
						success:false,
                        user:null
                    })
				
			} else {
				return res
					.status(200)
					.json({
                        success:true,
						user: users
					});
			}
		});
	}
};

export default connectDB(handler);
