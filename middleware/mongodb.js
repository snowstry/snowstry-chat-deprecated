import mongoose from "mongoose";
const connectDB = (handler) => async (req, res) => {
	if (mongoose.connections[0].readyState) {
		console.log("already connected");
		// Use current db connection
		return handler(req, res);
	}
	// Use new db connection
	await mongoose
		.connect(process.env.MONGO_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then(() => console.log("MongoDB Connected"))
		.catch((err) => console.log(err));
	return handler(req, res);
};

export default connectDB;
