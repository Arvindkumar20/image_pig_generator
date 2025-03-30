import axios from 'axios';
import 'dotenv/config';
// export const generateImage = async (prompt) => {
//     try {
//         const res = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(prompt)}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=1`);
//         const imageUrl = res.data.results[0].urls.regular;
//         console.log(imageUrl)
//         return imageUrl;

//     } catch (error) {
//         return error;
//     }
// }

// 🎨 Generate image using ImagePig API
export const generateImage = async (prompt, category = "general", resolution = "512x512", color = "full-color") => {
  try {
    // Define ImagePig API URL and Payload
    const apiUrl = "https://api.imagepig.com/xl";
    const payload = {
      prompt,
      category,
      resolution,
      color,
    };

    // Make API request to ImagePig
    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Api-Key": process.env.IMAGEPIG_API_KEY, // Your ImagePig API key
        "Content-Type": "application/json",
      },
    });

    // ✅ Validate the response and return base64 data
    if (response.status === 200 && response.data?.image_data) {
      return `data:image/png;base64,${response.data.image_data}`;
    } else {
      console.error("⚠ ImagePig API did not return valid image data");
      return null;
    }
  } catch (error) {
    console.error("❌ Error generating image with ImagePig API:", error.message);
    return null;
  }
};
