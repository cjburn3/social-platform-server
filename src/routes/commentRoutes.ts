import express, { Request, Response } from 'express';
import { supabase } from '../api/supabaseClient';
import { validateContent } from '../middleware/validation';

export const commentRoutes = express.Router();

// POST /posts/:id/comments - Add a comment to a post
commentRoutes.post('/:id/comments', validateContent, async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { content } = req.body;

  const { data, error } = await supabase
    .from('Comment')
    .insert([{ postID: postId, content }])
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json(data);
});