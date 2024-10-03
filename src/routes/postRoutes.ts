import express, { Request, Response } from 'express';
import { supabase } from '../api/supabaseClient';
import { validateContent } from '../middleware/validation';

export const postRoutes = express.Router();

// POST /posts - Create a new post
postRoutes.post('/', validateContent, async (req: Request, res: Response) => {
  const { content } = req.body;
  const { data, error } = await supabase
    .from('Post')
    .insert([{ content }])
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json(data);
});

// GET /posts - Retrieve all posts
postRoutes.get('/', async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('Post')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json(data);
});

// GET /posts/:id - Retrieve a specific post by ID
postRoutes.get('/:id', async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { data, error } = await supabase
    .from('Post')
    .select('*, Comment(*), PostLike(*)')
    .eq('id', postId)
    .single();

  if (error) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.status(200).json(data);
});