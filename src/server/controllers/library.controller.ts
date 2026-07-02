import { Response } from 'express';
import pool from '../config/database';
import { AuthenticatedRequest } from '../middleware/auth';

export const getMembership = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  try {
    const [members]: any = await pool.query(
      'SELECT id, is_active as isActive FROM library_members WHERE user_id = ?',
      [req.user.id]
    );

    if (members.length === 0) {
      return res.json({ isMember: false });
    }

    return res.json({ isMember: members[0].isActive === 1 });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error retrieving membership status.', error: error.message });
  }
};

export const joinMembership = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  const { memberName, memberEmail } = req.body;

  if (!memberName || !memberEmail) {
    return res.status(400).json({ message: 'Member name and email are required.' });
  }

  try {
    const id = 'mem-' + Math.random().toString(36).substr(2, 5).toUpperCase();

    // Check if membership already exists, if so update/activate it
    const [existing]: any = await pool.query('SELECT id FROM library_members WHERE user_id = ?', [req.user.id]);

    if (existing.length > 0) {
      await pool.query(
        'UPDATE library_members SET is_active = 1, member_name = ?, member_email = ? WHERE user_id = ?',
        [memberName, memberEmail, req.user.id]
      );
    } else {
      await pool.query(
        `INSERT INTO library_members (id, user_id, member_name, member_email, is_active)
         VALUES (?, ?, ?, ?, 1)`,
        [id, req.user.id, memberName, memberEmail]
      );
    }

    return res.status(201).json({ message: 'Library membership activated successfully.', isMember: true });
  } catch (error: any) {
    console.error('Library membership activation error:', error);
    return res.status(500).json({ message: 'Error activating library membership.', error: error.message });
  }
};

export const getLoans = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  try {
    let loans: any[];
    if (req.user.role === 'admin') {
      [loans] = await pool.query(
        'SELECT id, user_id as userId, book_id as bookId, book_title as bookTitle, status, loan_date as loanDate FROM book_loans ORDER BY created_at DESC'
      );
    } else {
      [loans] = await pool.query(
        'SELECT id, user_id as userId, book_id as bookId, book_title as bookTitle, status, loan_date as loanDate FROM book_loans WHERE user_id = ? ORDER BY created_at DESC',
        [req.user.id]
      );
    }

    return res.json(loans);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error retrieving book loans.', error: error.message });
  }
};

export const createLoan = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  const { bookId, bookTitle } = req.body;

  if (!bookId || !bookTitle) {
    return res.status(400).json({ message: 'Book details are required.' });
  }

  try {
    const id = 'loan-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const loanDate = new Date().toISOString().split('T')[0];

    await pool.query(
      `INSERT INTO book_loans (id, user_id, book_id, book_title, status, loan_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, req.user.id, bookId, bookTitle, 'pending', loanDate]
    );

    return res.status(201).json({
      message: 'Loan request submitted successfully.',
      loan: {
        id,
        userId: req.user.id,
        bookId,
        bookTitle,
        status: 'pending',
        loanDate,
      },
    });
  } catch (error: any) {
    console.error('Book loan error:', error);
    return res.status(500).json({ message: 'Error submitting book loan request.', error: error.message });
  }
};

export const updateLoanStatus = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required.' });
  }

  try {
    const [result]: any = await pool.query(
      'UPDATE book_loans SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Loan request not found.' });
    }

    return res.json({ message: 'Book loan status updated successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating book loan status.', error: error.message });
  }
};
