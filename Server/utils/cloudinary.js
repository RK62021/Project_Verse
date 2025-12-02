import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath, folder) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'image',
    });
    fs.unlinkSync(filePath); // delete local file after upload
    return result;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // delete local file on error
    }
    console.error('Cloudinary upload error:', error);
    return null;
  }
};

export { uploadToCloudinary };
