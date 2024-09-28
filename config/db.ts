import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


const MONGODB_URI = 'mongodb+srv://tenant:tenant512@tenants-data-record.l4tm3.mongodb.net/?retryWrites=true&w=majority&appName=tenants-data-record'


const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.log(error);
        process.exit(0) // It will exit the process when having error
    }
}

export default connectDB;