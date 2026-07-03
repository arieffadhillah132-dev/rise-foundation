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
    const registeredClass = details.registeredClass || null;
    const wave = details.wave || null;

    await getPool().query(
      `INSERT INTO registrations (id, user_id, program_type, program_id, program_name, status, registered_class, wave, details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, user.id, 'academy', programId, programName, 'submitted', registeredClass, wave, JSON.stringify(details)],
    );

    const registration = {
      id,
      userId: user.id,
      programType: 'academy',
      programId,
      programName,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0],
      details,
    };

    return res.status(201).json({ message: 'Academy registration submitted successfully.', registration });
  } catch (err) {
    return handleApiError(res, err, 'Error submitting academy registration.');
  }
}
