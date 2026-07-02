<<<<<<< HEAD
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Scholarship route stub' });
});
=======
import { Router } from 'express';
import { apply } from '../controllers/scholarship.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/apply', authMiddleware, apply);

export default router;
>>>>>>> fcde04f04ab142c0977eba58848d7f5e1088328b
