import express from 'express';
import { supabase } from '../index'; // Import the Supabase client

const router = express.Router();

// Add a like to a post
router.post('/:id/likes', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('PostLike')
        .insert([{ PostID: id }]);

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).send('Like added');
});

// Add a like to a comment
router.post('/comments/:id/likes', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('PostLike')
        .insert([{ CommentID: id }]);

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).send('Comment liked');
});

export default router;
