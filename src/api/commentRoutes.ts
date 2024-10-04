import express, { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabaseClient'; // Import the Supabase client you've configured

const router = express.Router();

// POST /posts/:id/comments - Add a comment to a specific post
router.post('/:id/comments', async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;
  const { content } = req.body;

  // Validate input
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Content is required and should be a string' });
  }

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
      .from('comment')
      .insert({ PostID: postId, content })
      .select();

    if (error) throw error;

    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
