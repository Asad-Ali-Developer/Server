import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://tenant:tenant512@tenants-data-record.l4tm3.mongodb.net/?retryWrites=true&w=majority&appName=tenants-data-record'


// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process on error
    }
};


export default connectDB;