import { Router } from 'express';
import { supabase } from '../index';

const router = Router();

// POST /posts/:id/comments - Add comment to a post
router.post('/:id/comments', async (req, res) => {
  const { content } = req.body;
  const { id: PostID } = req.params;

  if (!content) return res.status(400).json({ error: 'Content is required' });

  const { data, error } = await supabase.from('comment').insert([{ content, PostID }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
});

export default router;
