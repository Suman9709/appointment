import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DataBase is connected successfully");

    } catch (error) {
        console.error("Mongo DB connection failed", error.message)
    }
}

export default connectDB;