import { generateImage } from "../utils/generateimage.js";
import { cloudinaryStore } from "../utils/cloudinary.js";
import { Image } from "../models/images.model.js";
import { v2 as cloudinary } from "cloudinary"; // Ensure Cloudinary is properly configured


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createImage = async (req, res) => {
  const { prompt, author } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }
  const response = await generateImage(prompt);
  if (response instanceof Error) {
    return res.status(500).json(response);
  }
  const imageUrl = await cloudinaryStore(response);
  if (imageUrl instanceof Error) {
    return res.status(500).json(imageUrl);
  }
  console.log(`${imageUrl} image generated successfully`);
  let image;
  try {
    image = new Image({
      imageUrl: imageUrl,
      prompt,
      author,
    });
    // console.log(image);

    await image.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
  if (!image) {
    return res.status(500).json({ message: "Error storing image" });
  }
  return res.status(201).json({ message: "Image stored successfully", image });
};

export const getAllImages = async (req, res) => {
  let response;
  try {
    response = await Image.find();
    console.log(response)
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
  if (!response) {
    return res.json({
      message: "Images are not found",
    });
  }
  return res.json({
    message: "Images found successfully",
    response,
  });
};


export const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Find the image by ID
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found for this ID" });
    }

    // 2️⃣ Extract the public ID from the image URL
    const publicId = image.imageUrl.split("/").pop().split(".")[0]; // Extracts only the public ID

    // 3️⃣ Delete the image from Cloudinary
    const response = await cloudinary.uploader.destroy(publicId);
    if (response.result !== "ok") {
      return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
    }

    // 4️⃣ Remove the image from the database
    await Image.findByIdAndDelete(id);

    return res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

