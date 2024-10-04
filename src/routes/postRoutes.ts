import express, { Request, Response } from 'express';
import { supabase } from '../index'; // Ensure this imports your supabase client
import { validatePost } from '../middleware/validation';

const router = express.Router();

// POST /posts: Create a new post
router.post('/', validatePost, async (req: Request, res: Response) => {
  const { content } = req.body;

  const { data, error } = await supabase
    .from('Post')
    .insert([{ content }])
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
});

// GET /posts: Retrieve all posts
router.get('/', async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('Post')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
});

// GET /posts/:id: Retrieve a specific post
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('Post')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(404).json({ error: 'Post not found' });
  }

  return res.status(200).json(data);
});

export default router;
