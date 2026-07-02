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

export default router;
