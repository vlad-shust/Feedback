import { Request, Response } from 'express';
import Feedback from '../models/Feedback';
import * as errorMessages from '../utils/errorMessages';

export const createFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, title, type, message } = req.body;
    
    if (!name || !email || !title || !type || !message) {
      res.status(400).json({ error: errorMessages.MISSING_FIELDS });
      return;
    }

    const feedback = new Feedback({ name, email, title, type, message });
    const savedFeedback = await feedback.save();
    
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ error: errorMessages.SERVER_ERROR });
  }
};

export const getAllFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
      res.status(400).json({ error: errorMessages.INVALID_PAGINATION });
      return;
    }

    const options = {
      sort: { createdAt: -1 },
      limit: limitNumber,
      skip: (pageNumber - 1) * limitNumber,
    };

    const feedbackEntries = await Feedback.find({}, {}, options);
    res.json(feedbackEntries);
  } catch (error) {
    res.status(500).json({ error: errorMessages.SERVER_ERROR });
  }
};
