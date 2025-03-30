import express from 'express';
 import {createImage, getAllImages} from '../controllers/image.controller.js';

 const router = express.Router();

 router.get("/", (req, res)=>{
    res.send("Hello World");
 });
 router.post("/generate-image", createImage);
 router.get("/all-image", getAllImages);

 export const imageRouter = router;