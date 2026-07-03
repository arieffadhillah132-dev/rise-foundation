export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const demo = [
    {
      id: 'reg-001',
      userId: 'usr-abc123',
      programType: 'academy',
      programId: 'academy-001',
      programName: 'RISE Academy - Sekolah Dasar',
      status: 'in_review',
      submittedAt: '2026-07-01',
      details: {
        studentName: 'Budi Santoso',
        parentName: 'Ibu Siti',
        address: 'Jl. Merdeka No. 10',
        registeredClass: 'Kelas 5',
        wave: 'Gelombang 1 - 2026'
      }
    },
    {
      id: 'reg-002',
      userId: 'usr-def456',
      programType: 'camp',
      programId: 'camp-frontend',
      programName: 'RISE Camp - Web Programming',
      status: 'accepted',
      submittedAt: '2026-06-22',
      details: { }
    }
  ];

  return res.json(demo);
}
