export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const demo = [
    {
      id: 'inq-001',
      companyName: 'FinCorp Group',
      contactName: 'Rian Putra',
      email: 'rian@fincorp.com',
      phone: '081234567890',
      notes: 'Ingin menjajaki sponsorship program talenta digital.',
      submittedAt: '2026-06-20'
    }
  ];

  return res.json(demo);
}
