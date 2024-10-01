import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/posts', (req: Request, res: Response) => {
     const content = req.body.content; 

    if (!content || content.trim() === '') {
        return res.status(400).json({ error: 'Content cannot be empty' }); // Respond with an error
    }

    res.status(201).json({ message: 'Post created successfully', content }); 
});

export default router;