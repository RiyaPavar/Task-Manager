import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectMember {
  userId: mongoose.Types.ObjectId;
  role: 'Admin' | 'Member';
}

export interface IProject extends Document {
  title: string;
  description: string;
  ownerId: mongoose.Types.ObjectId;
  members: IProjectMember[];
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
