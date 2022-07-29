import mongoose from "mongoose";
import log from "@shared/logger";

const connectDB = (handler) => async (req, res) => {
	const mongoUrl: string = process.env.MONGO_URL as string;

	if (mongoose.connections[0].readyState) {
		log.info("Connection already established.");
		// Use current db connection
		return handler(req, res);
	}

	// Use new db connection
	await mongoose
		.connect(`${mongoUrl}`, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then(() => log.info("Connected to MongoDB."))
		.catch((err) => log.error(err));
	return handler(req, res);
};

export default connectDB;
