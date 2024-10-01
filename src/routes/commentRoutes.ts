import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

router.post('/:postId/comments', async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Content is required' });
  }

  const { data: post, error: postError } = await supabase
    .from('Post')
    .select('id')
    .eq('id', postId)
    .single();

  if (postError) return res.status(404).json({ error: 'Post not found' });

  const { data, error } = await supabase
    .from('comment')
    .insert([{ content, PostID: postId }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.get('/:postId/comments', async (req: Request, res: Response) => {
  const { postId } = req.params;

  const { data, error } = await supabase
    .from('comment')
    .select('*')
    .eq('PostID', postId)
    .order('timestamp', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
