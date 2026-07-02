import { Response } from 'express';
import pool from '../config/database';
import { AuthenticatedRequest } from '../middleware/auth';

export const apply = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  const { programType, programId, programName, details } = req.body;

  if (!programType || !programId || !programName || !details) {
    return res.status(400).json({ message: 'All program details are required.' });
  }

  try {
    const id = 'reg-' + Math.random().toString(36).substr(2, 5).toUpperCase();

    await pool.query(
      `INSERT INTO registrations (id, user_id, program_type, program_id, program_name, status, details)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, req.user.id, programType, programId, programName, 'submitted', JSON.stringify(details)]
    );

    return res.status(201).json({
      message: 'Registration submitted successfully.',
      registration: {
        id,
        userId: req.user.id,
        programType,
        programId,
        programName,
        status: 'submitted',
        submittedAt: new Date().toISOString().split('T')[0],
        details,
      },
    });
  } catch (error: any) {
    console.error('Camp registration error:', error);
    return res.status(500).json({ message: 'Error submitting registration.', error: error.message });
  }
};
