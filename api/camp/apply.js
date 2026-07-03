import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'rise_foundation_super_secret_jwt_key_2026';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Authorization required.' });

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    const { programType, programId, programName, details } = req.body || {};
    if (!programId || !programName) {
      return res.status(400).json({ message: 'Program details are required.' });
    }

    const id = 'reg-' + Math.random().toString(36).substr(2, 5).toUpperCase();

    const registration = {
      id,
      userId: decoded.id || 'usr-unknown',
      programType: programType || 'camp_training',
      programId,
      programName,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0],
      details: details || {},
    };

    return res.status(201).json({ message: 'Camp registration submitted (demo).', registration });
  } catch (err) {
    console.error('Serverless camp apply error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
}
