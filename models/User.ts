import mongoose from "mongoose";
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	friends: {
		type: Object,
		required: true,
		Incoming: {
			type: Array,
			required: true,
		},
		Outgoing: {
			type: Array,
			required: true,
		},
		friends: {
			type: Array,
			required: true,
		},
	}
});

(mongoose.models as any) = {};

var User = mongoose.model("users", userSchema);

export default User;
