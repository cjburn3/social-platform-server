import express, { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabaseClient';

const router = express.Router();

// POST /posts/:id/likes - Add a like to a post
router.post('/:id/likes', async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;

  try {
    const { data: postExists, error: postError } = await supabase
      .from('Post')
      .select('id')
      .eq('id', postId);

    if (postError) throw postError;

    if (!postExists || postExists.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const { data, error } = await supabase
      .from('PostLike')
      .insert({ PostID: postId })
      .select();

    if (error) throw error;

    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
