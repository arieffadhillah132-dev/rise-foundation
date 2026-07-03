import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'rise_foundation_super_secret_jwt_key_2026';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ user: decoded });
  } catch (err) {
    console.error('Serverless /me token error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
