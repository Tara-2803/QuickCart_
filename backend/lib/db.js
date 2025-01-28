import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect("mongodb+srv://jainsrushti286:Dz8383xTQllUJmf7@mernecommerce.nyfz9.mongodb.net/?retryWrites=true&w=majority&appName=mernecommerce");
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connecting to MONGODB", error.message);
		process.exit(1);
	}
};
