export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Demo: return membership status
  return res.json({ isMember: false, memberUntil: null });
}
