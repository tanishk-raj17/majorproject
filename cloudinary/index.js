const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
console.log(" CLOUDINARY FILE LOADED ");


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
console.log("DEBUG CLOUD NAME:", process.env.CLOUD_NAME);


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Wanderlust",
    allowedFormats: ["jpg", "jpeg", "png"], // ✅ CORRECT
  },
});

module.exports = { cloudinary, storage };
