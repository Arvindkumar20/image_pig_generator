import express from 'express';
 import {createImage, deleteImage, getAllImages} from '../controllers/image.controller.js';

 const router = express.Router();

 router.get("/", (req, res)=>{
    res.send("Hello World");
 });
 router.post("/generate-image", createImage);
 router.get("/all-image", getAllImages);
 router.delete("/delete/:id", deleteImage);

 export const imageRouter = router;