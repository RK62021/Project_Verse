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
        userId: { type: Schema.Types.ObjectId, ref: 'User',required: false },
        role: { type: String },
        name: { type: String },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
