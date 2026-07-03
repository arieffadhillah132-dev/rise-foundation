export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const loans = [
    {
      id: 'loan-001',
      userId: 'usr-abc123',
      bookTitle: 'Pemrograman Web untuk Pemula',
      dueDate: '2026-07-30',
      status: 'ongoing'
    }
  ];

  return res.json(loans);
}
