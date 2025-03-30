import { generateImage } from "../utils/generateimage.js";
import { cloudinaryStore } from "../utils/cloudinary.js";
import { Image } from "../models/images.model.js";
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
