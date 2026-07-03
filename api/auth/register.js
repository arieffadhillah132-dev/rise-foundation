import bcrypt from 'bcryptjs';
import { createToken, handleApiError, mapUser, methodNotAllowed } from '../_lib/auth.js';
import { ensureDatabase, getPool } from '../_lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

  try {
    await ensureDatabase();

    const { fullName, email, password, phoneNumber, role, persona } = req.body || {};
    if (!fullName || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const db = getPool();
    const normalizedEmail = email.toLowerCase();
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [normalizedEmail]);

    if (existing.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const id = 'usr-' + Math.random().toString(36).substr(2, 9);
    const passwordHash = await bcrypt.hash(password, 10);
    const userRole = role || 'visitor';
    const userPersona = persona || 'siswa_sma';

    await db.query(
      `INSERT INTO users (id, email, password_hash, full_name, phone_number, role, persona)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, normalizedEmail, passwordHash, fullName, phoneNumber, userRole, userPersona],
    );

    const user = {
      id,
      email: normalizedEmail,
      full_name: fullName,
      phone_number: phoneNumber,
      role: userRole,
      persona: userPersona,
    };
    const mappedUser = mapUser(user);

    return res.status(201).json({
      token: createToken(mappedUser),
      user: mappedUser,
    });
  } catch (err) {
    return handleApiError(res, err, 'Server error during registration.');
  }
}
