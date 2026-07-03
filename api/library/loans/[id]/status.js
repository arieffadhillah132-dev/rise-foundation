import { handleApiError, methodNotAllowed, requireAdmin } from '../../../_lib/auth.js';
import { ensureDatabase, getPool } from '../../../_lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return methodNotAllowed(res, ['PATCH']);
  }

  try {
    await ensureDatabase();
    requireAdmin(req);

    const { id } = req.query;
    const { status } = req.body || {};

    if (!status) {
      return res.status(400).json({ message: 'Status is required.' });
    }

    const [result] = await getPool().query('UPDATE book_loans SET status = ? WHERE id = ?', [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Loan request not found.' });
    }

    return res.json({ message: 'Book loan status updated successfully.' });
  } catch (err) {
    return handleApiError(res, err, 'Error updating book loan status.');
  }
}
