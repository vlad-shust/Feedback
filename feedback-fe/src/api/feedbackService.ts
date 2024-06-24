import axios from 'axios';
import { Feedback, FeedbackResponse } from '@/types/Feedback';

const API_URL = 'http://localhost:3000/api';

export async function createFeedback(feedbackData: Feedback): Promise<Feedback> {
  try {
    const { data, status } = await axios.post<Feedback>(`${API_URL}/feedback`, feedbackData);

    if (status !== 201) {
      throw new Error('Failed to create feedback');
    }

    return data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}


export async function getAllFeedback(page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc'): Promise<FeedbackResponse> {
  try {
    const { 
      data: { totalPages, currentPage, feedbackEntries },
      status 
    } = await axios.get<FeedbackResponse>(`${API_URL}/feedback`, {
      params: { page, limit, sortBy, sortOrder }
    });

    if (status !== 200) {
      throw new Error('Failed to fetch feedback');
    }

    return { totalPages, currentPage, feedbackEntries };
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

