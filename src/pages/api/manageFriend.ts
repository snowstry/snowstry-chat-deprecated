import connectDB from "@backend/middleware/mongodb";
import User from "@backend/models/User";

const handler = async (req, res) => {
	if (req.method === "POST") {
		var email = JSON.parse(req.body).myEmail;
		var username = JSON.parse(req.body).username;
		var type = JSON.parse(req.body).type;
		console.log(`email:${email}\nusername:${username}\ntype:${type}`);
		if (!email) return;

		User.findOne({ username: username }).then((UserToManage) => {
			if (!UserToManage) {
				return res.status(200).json({
					success: false,
					msg: "No User with that name exists",
					user: null,
				});
			} else {
				if (type === "add") {
					const Outgoing = {
						name: UserToManage.name,
						username: UserToManage.username,
					};
					User.findOneAndUpdate(
						{ email: email },
						{ $push: { "friends.Outgoing": Outgoing } }
					).then(async (meUser) => {
						const Incoming = {
							name: meUser.name,
							username: meUser.username,
						};
						User.findOneAndUpdate(
							{ username: username },
							{ $push: { "friends.Incoming": Incoming } }
						).then(async (UserToAddNow) => {
							return res.status(200).json({
								success: true,
								msg: `${meUser.username} sent friend request to ${UserToAddNow.username}`,
							});
						});
					});
				}
				if (type === "cancel") {
					const Outgoing = {
						name: UserToManage.name,
						username: UserToManage.username,
					};
					User.findOneAndUpdate(
						{ email: email },
						{ $pull: { "friends.Outgoing": Outgoing } }
					).then(async (meUser) => {
						const Incoming = {
							name: meUser.name,
							username: meUser.username,
						};
						User.findOneAndUpdate(
							{ username: username },
							{ $pull: { "friends.Incoming": Incoming } }
						).then(async (UserToRemove) => {
							return res.status(200).json({
								success: true,
								msg: `${meUser.username} cancelled their friend request to ${UserToRemove.username}`,
							});
						});
					});
				}
				if (type === "accept") {
					const UserToAdd = {
						name: UserToManage.name,
						username: UserToManage.username,
					};
					User.findOneAndUpdate(
						{ email: email },
						{
							$pull: { "friends.Incoming": UserToAdd },
							$push: { "friends.friends": UserToAdd },
						}
					).then(async (meUser) => {
						const selfInfo = {
							name: meUser.name,
							username: meUser.username,
						};
						User.findOneAndUpdate(
							{ username: username },
							{
								$pull: { "friends.Outgoing": selfInfo },
								$push: { "friends.friends": selfInfo },
							}
						).then(async (UserToAdd) => {
							return res.status(200).json({
								success: true,
								msg: `${meUser.username} accepted ${UserToAdd.username}'s Request`,
							});
						});
					});
				}
				if (type === "remove") {
					const UserToManageFriend = {
						name: UserToManage.name,
						username: UserToManage.username,
					};
					User.findOneAndUpdate(
						{ email: email },
						{ $pull: { "friends.friends": UserToManageFriend } }
					).then(async (meUser) => {
						const myFriend = {
							name: meUser.name,
							username: meUser.username,
						};
						User.findOneAndUpdate(
							{ username: username },
							{ $pull: { "friends.friends": myFriend } }
						).then(async (UserToRemove) => {
							return res.status(200).json({
								success: true,
								msg: `${meUser.username} removed ${UserToRemove.username} from their friend list`,
							});
						});
					});
				}
			}
		});
	}
};

export default connectDB(handler);
