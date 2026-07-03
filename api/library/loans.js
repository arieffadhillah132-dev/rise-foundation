import { handleApiError, methodNotAllowed, requireUser } from '../_lib/auth.js';
import { ensureDatabase, getPool } from '../_lib/database.js';

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) {
    return methodNotAllowed(res, ['GET', 'POST']);
  }

  try {
    await ensureDatabase();

    const user = requireUser(req);
    const db = getPool();

    if (req.method === 'GET') {
      const query = `
        SELECT
          id,
          user_id as userId,
          book_id as bookId,
          book_title as bookTitle,
          status,
          loan_date as loanDate
        FROM book_loans
        ${user.role === 'admin' ? '' : 'WHERE user_id = ?'}
        ORDER BY created_at DESC
      `;
      const [loans] = await db.query(query, user.role === 'admin' ? [] : [user.id]);

      return res.json(loans);
    }

    const { bookId, bookTitle } = req.body || {};
    if (!bookId || !bookTitle) {
      return res.status(400).json({ message: 'Book details are required.' });
    }

    const id = 'loan-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const loanDate = new Date().toISOString().split('T')[0];

    await db.query(
      `INSERT INTO book_loans (id, user_id, book_id, book_title, status, loan_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, user.id, bookId, bookTitle, 'pending', loanDate],
    );

    return res.status(201).json({
      message: 'Loan request submitted successfully.',
      loan: {
        id,
        userId: user.id,
        bookId,
        bookTitle,
        status: 'pending',
        loanDate,
      },
    });
  } catch (err) {
    return handleApiError(res, err, 'Error handling book loans.');
  }
}
