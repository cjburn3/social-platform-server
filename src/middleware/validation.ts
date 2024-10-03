import { Request, Response, NextFunction } from 'express';

export function validateContent(req: Request, res: Response, next: NextFunction) {
  const { content } = req.body;
  if (!content || typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ error: 'Content must be a non-empty string' });
  }
  next();
}