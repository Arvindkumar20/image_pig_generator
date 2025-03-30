import mongoose, { trusted } from "mongoose";

const imageSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    prompt:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:trusted
    }
});

export const Image = mongoose.model("Image", imageSchema);
