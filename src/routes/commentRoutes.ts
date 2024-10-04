import express, { Request, Response } from 'express';
import { supabase } from '../index';
import { validateComment } from '../middleware/validation';

const router = express.Router();

// POST /posts/:id/comments: Add a comment to a specific post
router.post('/:id/comments', validateComment, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  const { data, error } = await supabase
    .from('comment')
    .insert([{ PostID: id, content }])
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
});

export default router;
