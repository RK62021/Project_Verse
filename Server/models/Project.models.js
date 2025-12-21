import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: [{ type: String }],
    projectImageUrl: { type: String },
    repositoryUrl: { type: String, required: true },
    liveDemoUrl: { type: String },
    technologies: [{ type: String }],
    contributors: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        role: { type: String },
        name: { type: String },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likesCount: { type: Number, default: 0 },
    views: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    viewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
