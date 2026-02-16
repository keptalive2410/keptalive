import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if(!MONGODB_URI){
    throw new Error("Please define MongoDB URL");
}

export async function connectDB() {
    if(mongoose.connection.readyState >= 1)
            return;
    
    await mongoose.connect(MONGODB_URI);
};