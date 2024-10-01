import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

router.post('/', async (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });

  const { data, error } = await supabase.from('Post').insert([{ content }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.get('/', async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('Post')
    .select('*, comment(*), PostLike(*)')
    .order('timestamp', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('Post')
    .select('*, comment(*), PostLike(*)')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: 'Post not found' });
  res.json(data);
});

export default router;

if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Content cannot be empty' });
  }
