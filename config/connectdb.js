import "dotenv/config"
import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MongoDB); 
        if (!res){
           console.log("mongodb not connected")
        }
        console.log("mongobd connected")
    } catch (error) {
        console.log(error)
        
    }
}