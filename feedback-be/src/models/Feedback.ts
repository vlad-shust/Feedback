import mongoose, { Schema, Document } from 'mongoose';
import { FeedbackType } from './FeedbackType';

export interface IFeedback extends Document {
  name: string;
  email: string;
  title: string;
  type: FeedbackType;
  message: string;
  createdAt: Date;
}

const feedbackSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: Object.values(FeedbackType), required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFeedback>('FeedbackList', feedbackSchema);
