import express from "express";
import cors from "cors";
import { imageRouter } from "./routes/image.route.js";
import { connectDB } from "./config/connectDB.js";


try {
    connectDB();
    console.log("mongo connected");
} catch (error) {
    console.log(error);
}
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



// Password= "OOMeZ8UJdLHmVlh7"
// MongoDB="mongodb+srv://anjaliverma95062:OOMeZ8UJdLHmVlh7@aiimagegenrater.zwnfz.mongodb.net/?retryWrites=true&w=majority&appName=AiImagegenrater"
// UNSPLASH_ACCESS_KEY="3BJ7zYGzwEZ5olJl8KJPRJnHJ3_wISWPsZMkM2Ib9tE"
// CLOUDINARY_CLOUD_NAME="ddnsg2woa"   
// CLOUDINARY_API_KEY="467511194623355"
// CLOUDINARY_API_SECRET="nU1-emBD7hlFm3NNydfZMXH1O80"
// IMAGEPIG_API_KEY="403797d3-f972-4396-82c1-362f42c96185"