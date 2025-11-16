import mongoose, { Collection } from 'mongoose';

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bio: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  college: { type: String, default: '' },
  socialLinks: {
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

},{timestamps:true});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;
