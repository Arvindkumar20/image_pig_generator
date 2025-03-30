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