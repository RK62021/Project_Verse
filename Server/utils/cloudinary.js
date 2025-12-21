import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath, folder = 'uploads') => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'image',
    });
    fs.unlinkSync(filePath); // delete local file after upload
    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // delete local file on error
    }
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

const getPublicIdFromUrl = (url) => {
  try {
    // Extract public_id from Cloudinary URL
    // URL format: https://res.cloudinary.com/cloud_name/image/upload/v123456/folder/filename.jpg
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    // Get everything after 'upload/v123456/' or 'upload/'
    const publicIdParts = parts.slice(uploadIndex + 1);
    // Remove version if exists
    if (publicIdParts[0] && publicIdParts[0].startsWith('v')) {
      publicIdParts.shift();
    }
    
    // Join and remove extension
    const publicIdWithExt = publicIdParts.join('/');
    const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
    return publicId;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};

const deleteFromCloudinary = async (url) => {
  try {
    const publicId = getPublicIdFromUrl(url);
    if (!publicId) return;

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    return null;
  }
};

export { uploadToCloudinary, getPublicIdFromUrl, deleteFromCloudinary };  