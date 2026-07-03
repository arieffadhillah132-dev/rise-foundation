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
      const [members] = await db.query(
        'SELECT id, is_active as isActive FROM library_members WHERE user_id = ?',
        [user.id],
      );

      if (members.length === 0) {
        return res.json({ isMember: false });
      }

      return res.json({ isMember: members[0].isActive === 1 });
    }

    const { memberName, memberEmail } = req.body || {};
    if (!memberName || !memberEmail) {
      return res.status(400).json({ message: 'Member name and email are required.' });
    }

    const [existing] = await db.query('SELECT id FROM library_members WHERE user_id = ?', [user.id]);

    if (existing.length > 0) {
      await db.query(
        'UPDATE library_members SET is_active = 1, member_name = ?, member_email = ? WHERE user_id = ?',
        [memberName, memberEmail, user.id],
      );
    } else {
      const id = 'mem-' + Math.random().toString(36).substr(2, 5).toUpperCase();
      await db.query(
        `INSERT INTO library_members (id, user_id, member_name, member_email, is_active)
         VALUES (?, ?, ?, ?, 1)`,
        [id, user.id, memberName, memberEmail],
      );
    }

    return res.status(201).json({ message: 'Library membership activated successfully.', isMember: true });
  } catch (err) {
    return handleApiError(res, err, 'Error handling library membership.');
  }
}
