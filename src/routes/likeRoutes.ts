import express, { Request, Response } from 'express';
import { supabase } from '../api/supabaseClient';

export const likeRoutes = express.Router();

// POST /posts/:id/likes - Add a like to a post
likeRoutes.post('/:id/likes', async (req: Request, res: Response) => {
  const postId = req.params.id;

  const { data, error } = await supabase
    .from('PostLike')
    .insert([{ postID: postId }])
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json(data);
});

// POST /comments/:id/likes - Add a like to a comment
likeRoutes.post('/comments/:id/likes', async (req: Request, res: Response) => {
  const commentId = req.params.id;

  const { data, error } = await supabase
    .from('PostLike')
    .insert([{ commentID: commentId }])
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json(data);
});