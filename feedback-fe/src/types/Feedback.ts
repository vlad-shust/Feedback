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

export interface FeedbackResponse {
  totalPages: number;
  currentPage: number;
  feedbackEntries: Feedback[];
};
