import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("error connecting to MongoDB", error.message);
        process.exit(1);
    }
}