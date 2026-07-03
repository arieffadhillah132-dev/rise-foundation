import { handleApiError, mapUser, methodNotAllowed, requireUser } from '../_lib/auth.js';
import { ensureDatabase, getPool } from '../_lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }

  try {
    await ensureDatabase();

    const decoded = requireUser(req);
    const [users] = await getPool().query(
      'SELECT id, email, full_name, phone_number, role, persona, created_at FROM users WHERE id = ?',
      [decoded.id],
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(mapUser(users[0]));
  } catch (err) {
    return handleApiError(res, err, 'Error retrieving user profile.');
  }
}
