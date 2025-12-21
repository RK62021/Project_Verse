import Profile from "../models/Profile.models.js";
import asyncHandler from "../utils/asynkHandeler.js";
import ApiError from "../utils/ErrorHandeler.js";
import ApiResponse from "../utils/ResponseHandeler.js";
import { uploadToCloudinary , deleteFromCloudinary} from "../utils/cloudinary.js";

class ProfileController {

  // Update user profileb 
  UpdateProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { bio, college, socialLinks, contactEmail } = req.body;

    let profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return next(new ApiError(404, "Profile not found"));
    }

    // Apply updates only if provided (avoids overwriting with empty/undefined)
    if (bio !== undefined) profile.bio = bio;
    if (college !== undefined) profile.college = college;
    if (contactEmail !== undefined) profile.contactEmail = contactEmail;

    // Merge socialLinks safely
    if (socialLinks && typeof socialLinks === "object") {
      profile.socialLinks = { ...profile.socialLinks, ...socialLinks };
    }

    // No need to manually set updatedAt — timestamps:true handles it
    await profile.save();

    return res.json(
      new ApiResponse(200, "Profile updated successfully", profile)
    );
  });

  // Upload avatar image
  uploadAvatar = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    if (!req.file) {
      return next(new ApiError(400, "No file uploaded"));
    }

    // Upload to Cloudinary
    const avatarUrl = await uploadToCloudinary(req.file.path, "avatars");

    let profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return next(new ApiError(404, "Profile not found"));
    }

    // Delete old avatar from Cloudinary if exists
    if (profile.avatarUrl) {
      await deleteFromCloudinary(profile.avatarUrl);
    }

    profile.avatarUrl = avatarUrl;
    await profile.save();

    return res.json(
      new ApiResponse(200, "Avatar uploaded successfully", { avatarUrl })
    );
  });

  // Get user profile
  getProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const profile = await Profile.findOne({ user: userId }).populate('user', 'name email');
    if (!profile) {
      return next(new ApiError(404, "Profile not found"));
    }

    return res.json(
      new ApiResponse(200, "Profile retrieved successfully", profile)
    );
  });

  // Test endpoint
  test = asyncHandler(async (req, res, next) => {
    return res.json(
      new ApiResponse(200, "Profile controller working fine", {
        user: req.user,
      })
    );
  });
}

export default new ProfileController();
