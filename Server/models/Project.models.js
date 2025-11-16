import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    repositoryUrl: { type: String, required: true },
    liveDemoUrl: { type: String },
    technologies: [{ type: String }],
    contributors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
