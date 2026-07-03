import { handleApiError, methodNotAllowed, requireAdmin } from '../_lib/auth.js';
import { ensureDatabase, getPool } from '../_lib/database.js';

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) {
    return methodNotAllowed(res, ['GET', 'POST']);
  }

  try {
    await ensureDatabase();

    const db = getPool();

    if (req.method === 'GET') {
      requireAdmin(req);

      const [inquiries] = await db.query(
        `SELECT
          id,
          company_name as companyName,
          contact_name as contactName,
          email,
          phone,
          notes,
          submitted_at as submittedAt
        FROM sponsor_inquiries
        ORDER BY created_at DESC`,
      );

      return res.json(inquiries);
    }

    const { companyName, contactName, email, phone, notes } = req.body || {};
    if (!companyName || !contactName || !email || !phone) {
      return res.status(400).json({ message: 'All inquiry details are required.' });
    }

    const id = 'inq-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const submittedAt = new Date().toISOString().split('T')[0];

    await db.query(
      `INSERT INTO sponsor_inquiries (id, company_name, contact_name, email, phone, notes, submitted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, companyName, contactName, email, phone, notes || null, submittedAt],
    );

    return res.status(201).json({
      message: 'Sponsorship inquiry submitted successfully.',
      inquiry: { id, companyName, contactName, email, phone, notes, submittedAt },
    });
  } catch (err) {
    return handleApiError(res, err, 'Error handling sponsor inquiry.');
  }
}
