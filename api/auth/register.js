import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'rise_foundation_super_secret_jwt_key_2026';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, email, password, phoneNumber, role, persona } = req.body || {};
    if (!fullName || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // NOTE: This serverless/register implementation does NOT persist data.
    // It's intended for demo/prototype usage on Vercel. Replace with
    // a real DB-backed implementation for production.

    const id = 'usr-' + Math.random().toString(36).substr(2, 9);
    const userRole = role || 'visitor';
    const userPersona = persona || 'siswa_sma';

    const token = jwt.sign({ id, email, role: userRole, persona: userPersona, fullName }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      token,
      user: { id, email, fullName, role: userRole, persona: userPersona, phoneNumber }
    });
  } catch (err) {
    console.error('Serverless register error:', err);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
}
