import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

router.post('/posts/:postId/likes', async (req: Request, res: Response) => {
  const { postId } = req.params;

  const { data: post, error: postError } = await supabase
    .from('Post')
    .select('id')
    .eq('id', postId)
    .single();

  if (postError) return res.status(404).json({ error: 'Post not found' });

  const { data, error } = await supabase
    .from('PostLike')
    .insert([{ PostID: postId }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.post('/comments/:commentId/likes', async (req: Request, res: Response) => {
  const { commentId } = req.params;

  const { data: comment, error: commentError } = await supabase
    .from('comment')
    .select('id')
    .eq('id', commentId)
    .single();

  if (commentError) return res.status(404).json({ error: 'Comment not found' });

  const { data, error } = await supabase
    .from('PostLike')
    .insert([{ CommentID: commentId }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

export default router;