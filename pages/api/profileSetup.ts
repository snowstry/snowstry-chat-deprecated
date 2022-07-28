import connectDB from "../../middleware/mongodb";
import User from "../../models/User";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var email = JSON.parse(req.body).email;
        var username = JSON.parse(req.body).username;
        var usernameRegexed = new RegExp(["^",username,"$"].join(""), "i");

        var name = JSON.parse(req.body).name
        var pfp = JSON.parse(req.body).pfp
        var add = JSON.parse(req.body).add
        console.log(username, email, name, pfp)

        if(add === true){
            if(!email || !username || !name || !pfp) return console.log("no data");
        }
        if(!email) return
        const friends = {
			Incoming: [],
			Outgoing: [],
			friends: [],
		};
        User.findOne({ email : email }).then((user) => {
            console.log(user)
            if (!user) {
                if(add === true){  
                    User.findOne({ username: usernameRegexed }).then(async (user) => {
                        if(user){
                            console.log(user)
                            console.log("username already taken")
                            return res
                            .status(200)
                            .json({
                                success:false,
                                msg:"Username Already Exists"
                            })
                        }
                        else{
                            const newUser = new User({
                        		name,
                                username,
                        		email,
                        		friends,
                            	pfp,
                            });
                            await newUser.save().then((user) => {
                        		console.log("Registered New User To DB");
                                console.log("adding user")

                                return res
                                .status(200)
                                .json({
                                    success:true,
                                    msg:"Username pushed"
                                }) 
                            });
                              
                        }
                    })     
                }
                else{
                    return res
                    .status(200)
                    .json({
						success:false,
                        user:null
                    }) 
                }
				
			} else {
                console.log("user already exists huh")
				return res
					.status(200)
					.json({
                        success:true,
						user: user
					});
			}
		});
	}
};

export default connectDB(handler);
