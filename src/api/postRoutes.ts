import express, { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabaseClient'; // Import the Supabase client you've configured

const router = express.Router();

// POST /posts - Create a new post
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body;
  
  // Validate input
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Content is required and should be a string' });
  }

  try {
    const { data, error } = await supabase
      .from('Post')
      .insert({ content })
      .select();

    if (error) throw error;

    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

// GET /posts - Retrieve all posts
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await supabase
      .from('Post')
      .select('*, comment(*), PostLike(*)')
      .order('timestamp', { ascending: false });

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

// GET /posts/:id - Retrieve a specific post by its id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.id;

  try {
    const { data, error } = await supabase
      .from('Post')
      .select('*, comment(*), PostLike(*)')
      .eq('id', postId);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
