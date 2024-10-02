import { Router } from 'express';
import { supabase } from '../index';

const router = Router();

// POST /posts - Create a new post
router.post('/', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const { data, error } = await supabase.from('Post').insert([{ content }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
});

// GET /posts - Retrieve all posts
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('Post').select('*').order('timestamp', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

export default router;