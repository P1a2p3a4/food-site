import mongoose from "mongoose";


//export const url = "http://localhost:5000";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DatabaseConnected');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

