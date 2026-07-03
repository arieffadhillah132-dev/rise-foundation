import { handleApiError, methodNotAllowed, requireUser } from '../_lib/auth.js';
import { ensureDatabase, getPool } from '../_lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

  try {
    await ensureDatabase();

    const user = requireUser(req);

    const { programId, programName, details } = req.body || {};
    if (!programId || !programName || !details) {
      return res.status(400).json({ message: 'Program details are required.' });
    }

    const id = 'reg-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    await getPool().query(
      `INSERT INTO registrations (id, user_id, program_type, program_id, program_name, status, details)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, user.id, 'scholarship', programId, programName, 'submitted', JSON.stringify(details)],
    );

    const registration = {
      id,
      userId: user.id,
      programType: 'scholarship',
      programId,
      programName,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0],
      details,
    };

    return res.status(201).json({ message: 'Scholarship application submitted successfully.', registration });
  } catch (err) {
    return handleApiError(res, err, 'Error submitting scholarship application.');
  }
}
