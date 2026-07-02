<<<<<<< HEAD
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Auth route stub' });
});
=======
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
>>>>>>> fcde04f04ab142c0977eba58848d7f5e1088328b

export default router;
