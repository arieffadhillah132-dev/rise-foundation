<<<<<<< HEAD
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Camp route stub' });
});
=======
import { Router } from 'express';
import { apply } from '../controllers/camp.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/apply', authMiddleware, apply);
>>>>>>> fcde04f04ab142c0977eba58848d7f5e1088328b

export default router;
