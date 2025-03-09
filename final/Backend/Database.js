import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const url = "mongodb://127.0.0.1:27017/finmanager";
        const connection = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit process with failure
    }
};
