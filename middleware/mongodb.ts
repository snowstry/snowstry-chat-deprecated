import mongoose from "mongoose";
const connectDB = (handler) => async (req, res) => {

	const mongoUrl: string = (process.env.MONGO_URL as string);
	console.log(mongoUrl)

	if (mongoose.connections[0].readyState) {
		console.log("already connected");
		// Use current db connection
		return handler(req, res);
	}
	
	// Use new db connection
	await mongoose
		.connect(`${mongoUrl}`, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then(() => console.log("MongoDB Connected"))
		.catch((err) => console.log(err));
	return handler(req, res);
};

export default connectDB;
