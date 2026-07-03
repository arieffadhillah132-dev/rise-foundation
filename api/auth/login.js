import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'rise_foundation_super_secret_jwt_key_2026';

// Demo accounts mirror the frontend demo list so instant login works on Vercel
const DEMO_ACCOUNTS = [
  {
    role: 'visitor',
    email: 'maharani@rise.org',
    fullName: 'Maharani Syifatania',
    persona: 'siswa_sma'
  },
  {
    role: 'admin',
    email: 'admin@rise.org',
    fullName: 'Evi Lestari',
    persona: 'mitra'
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Support demo accounts without DB for serverless deployment
    const demo = DEMO_ACCOUNTS.find(a => a.email === email.toLowerCase());
    if (demo && password === 'password123') {
      const id = 'usr-' + Math.random().toString(36).substr(2, 9);
      const token = jwt.sign({ id, email: demo.email, role: demo.role, persona: demo.persona, fullName: demo.fullName }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id, email: demo.email, fullName: demo.fullName, role: demo.role, persona: demo.persona } });
    }

    // For production, the real DB-backed login should be used. Here we only support demo and simple rejection.
    return res.status(400).json({ message: 'Invalid credentials or account not found (serverless demo only).' });
  } catch (err) {
    console.error('Serverless login error:', err);
    return res.status(500).json({ message: 'Server error during login.' });
  }
}
