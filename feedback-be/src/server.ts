import express from 'express';
import cors from 'cors';
import feedbackRoutes from './routes/feedbackRoutes';
import connectDB from './database';

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

