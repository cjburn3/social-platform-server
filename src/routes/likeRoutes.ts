import express, { Request, Response } from 'express';
import { supabase } from '../index';

const router = express.Router();

// POST /posts/:id/likes: Add a like to a post
router.post('/:id/likes', async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('PostLike')
    .insert([{ PostID: id }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({ message: 'Post liked' });
});

// POST /comments/:id/likes: Add a like to a comment
router.post('/:id/likes', async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('PostLike')
    .insert([{ CommentID: id }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({ message: 'Comment liked' });
});

export default router;
