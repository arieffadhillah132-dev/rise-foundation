import { Router } from 'express';
import { apply } from '../controllers/academy.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/apply', authMiddleware, apply);

export default router;
