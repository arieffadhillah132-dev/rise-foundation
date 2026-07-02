<<<<<<< HEAD
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Library route stub' });
});
=======
import { Router } from 'express';
import {
  getMembership,
  joinMembership,
  getLoans,
  createLoan,
  updateLoanStatus
} from '../controllers/library.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

router.get('/membership', authMiddleware, getMembership);
router.post('/membership', authMiddleware, joinMembership);

router.get('/loans', authMiddleware, getLoans);
router.post('/loans', authMiddleware, createLoan);
router.patch('/loans/:id/status', authMiddleware, adminMiddleware, updateLoanStatus);
>>>>>>> fcde04f04ab142c0977eba58848d7f5e1088328b

export default router;
