import express, { Request, Response, NextFunction } from 'express';
import { postRoutes } from './routes/postRoutes';
import { commentRoutes } from './routes/commentRoutes';
import { likeRoutes } from './routes/likeRoutes';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});