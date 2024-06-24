export interface Feedback {
  name: string,
  email: string,
  title: string,
  type: FeedbackType,
  message: string,
  createdAt: string,
  _id: string,
};

export enum FeedbackType {
  Bug = 'Bug',
  Suggestion = 'Suggestion',
};