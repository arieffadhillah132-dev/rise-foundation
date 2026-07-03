import bcrypt from 'bcryptjs';
import { createToken, handleApiError, mapUser, methodNotAllowed } from '../_lib/auth.js';
import { ensureDatabase, getPool } from '../_lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

  try {
    await ensureDatabase();

    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const db = getPool();
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);

    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const row = users[0];
    const isMatch = await bcrypt.compare(password, row.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const user = mapUser(row);
    return res.json({ token: createToken(user), user });
  } catch (err) {
    return handleApiError(res, err, 'Server error during login.');
  }
}
