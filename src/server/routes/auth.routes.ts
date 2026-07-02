import { Router } from 'express';
import {
  register,
  login,
  getMe,
  getRegistrations,
  updateRegistrationStatus,
  getSponsorInquiries,
  createSponsorInquiry
} from '../controllers/auth.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

// Registrations handling inside core/auth routes for user dashboard
router.get('/registrations', authMiddleware, getRegistrations);
router.patch('/registrations/:id/status', authMiddleware, adminMiddleware, updateRegistrationStatus);

// Sponsor inquiries handling
router.get('/inquiries', authMiddleware, adminMiddleware, getSponsorInquiries);
router.post('/inquiries', createSponsorInquiry);

export default router;
