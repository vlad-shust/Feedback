import axios, { AxiosResponse } from 'axios';
import { Feedback } from '@/types/Feedback';

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


export async function getAllFeedback(page = 1, limit = 10): Promise<Feedback[]> {
    try {
      const { data, status } = await axios.get<Feedback[]>(`${API_URL}/feedback`, {
        params: { page, limit }
      });
  
      if (status !== 200) {
        throw new Error('Failed to fetch feedback');
      } 

      return data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }