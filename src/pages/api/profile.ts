import connectDB from "@backend/middleware/mongodb";
import User from "@backend/models/User";
import log from "@shared/logger";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var searchedName = new RegExp(
			["^", JSON.parse(req.body).searchedName, "$"].join(""),
			"i"
		);
		var email = JSON.parse(req.body).myEmail;

		if (searchedName === undefined) return;
		User.findOne({ username: searchedName }).then((user) => {
			if (!user) {
				console.log("ye naubat nahi")
				return res.status(200).json({
					success: false,
					msg: "No User Exists With That Username",
					user: null,
				});
			} else {
				User.findOne({ email: email }).then((userMe) => {
					if(userMe?.username === user.username){
						return res.status(200).json({
							sessionedUser:true,
							user: user,
						})
					}
					else{
						userMe?.friends.Outgoing.map((OutUsers) => {
							console.log(OutUsers?.username)
							if(OutUsers === null){
								return res.status(200).json({
									sessionedUser:false,
									request:"noreq",
									user: user,
								});
							}
							else if(OutUsers?.username === user.username){
								return res.status(200).json({
									sessionedUser:false,
									request:"Outgoing",
									user: user,
								});
							}
						})
						userMe?.friends.Incoming.map((Inuser) => {
							if(Inuser === null){
								return res.status(200).json({
									sessionedUser:false,
									request:"noreq",
									user: user,
								});
							}
							else if(Inuser?.username === user.username){
								return res.status(200).json({
									sessionedUser:false,
									request:"Incoming",
									user: user,
								});
							}
						})					
						userMe?.friends.friends.map((friends) => {
							if(friends === null){
								return res.status(200).json({
									sessionedUser:false,
									request:"noreq",
									user: user,
								})
							}
							else if(friends?.username === user.username){
								return res.status(200).json({
									sessionedUser:false,
									request:"friend",
									user: user,
								});
							}
						})
						return res.status(200).json({
							sessionedUser:false,
							request:"noreq",
							user: user,
						});
					}
				})				
			}
		});
	}
};

export default connectDB(handler);
