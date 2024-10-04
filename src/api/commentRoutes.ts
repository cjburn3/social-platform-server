import express from 'express';
import { supabase } from '../index'; // Import the Supabase client

const router = express.Router();

// Add a comment to a specific post
router.post('/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const { data, error } = await supabase
        .from('comment')
        .insert([{ PostID: id, content }])
        .single();
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

export default router;
