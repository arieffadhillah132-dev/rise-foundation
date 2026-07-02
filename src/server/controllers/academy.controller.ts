import { Response } from 'express';
import pool from '../config/database';
import { AuthenticatedRequest } from '../middleware/auth';

export const apply = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  const { programId, programName, details } = req.body;

  if (!programId || !programName || !details) {
    return res.status(400).json({ message: 'Program details are required.' });
  }

  try {
    const id = 'reg-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const registeredClass = details.registeredClass || null;
    const wave = details.wave || null;

    await pool.query(
      `INSERT INTO registrations (id, user_id, program_type, program_id, program_name, status, registered_class, wave, details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, req.user.id, 'academy', programId, programName, 'submitted', registeredClass, wave, JSON.stringify(details)]
    );

    return res.status(201).json({
      message: 'Academy registration submitted successfully.',
      registration: {
        id,
        userId: req.user.id,
        programType: 'academy',
        programId,
        programName,
        status: 'submitted',
        submittedAt: new Date().toISOString().split('T')[0],
        details,
      },
    });
  } catch (error: any) {
    console.error('Academy registration error:', error);
    return res.status(500).json({ message: 'Error submitting academy registration.', error: error.message });
  }
};
