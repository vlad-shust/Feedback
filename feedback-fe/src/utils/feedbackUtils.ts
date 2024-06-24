import { Feedback, FeedbackType } from '@/types/Feedback';

export const defaultFeedback: Feedback = {
  email: '',
  type: FeedbackType.Suggestion,
  message: '',
  name: '',
  title: '',
  createdAt: '',
  _id: ''
};