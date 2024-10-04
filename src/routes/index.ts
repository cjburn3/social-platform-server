import express from 'express';
import postRoutes from '../api/postRoutes';
import commentRoutes from '../api/commentRoutes';
import likeRoutes from '../api/likeRoutes';

const router = express.Router();

router.use('/posts', postRoutes);
router.use('/posts', commentRoutes);
router.use('/posts', likeRoutes);

export default router;
