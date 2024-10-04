import express from 'express';
import { supabase } from '../index'; // Import the Supabase client

const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
    const { content } = req.body;
    const { data, error } = await supabase
        .from('Post')
        .insert([{ content }])
        .single();
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// Get all posts
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('Post')
        .select('*')
        .order('timestamp', { ascending: false });
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

// Get a post by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('Post')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(data);
});

export default router;