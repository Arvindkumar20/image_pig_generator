import express from "express";
import cors from "cors";
import { imageRouter } from "./routes/image.route.js";
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
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello World");
});


app.use("/api", imageRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

