import { handleApiError, methodNotAllowed, requireUser } from '../_lib/auth.js';
import { ensureDatabase, getPool, parseJsonField, toDateString } from '../_lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }

  try {
    await ensureDatabase();

    const user = requireUser(req);
    const db = getPool();
    const query = `
      SELECT
        id,
        user_id as userId,
        program_type as programType,
        program_id as programId,
        program_name as programName,
        status,
        registered_class as registeredClass,
        wave,
        created_at as submittedAt,
        details
      FROM registrations
      ${user.role === 'admin' ? '' : 'WHERE user_id = ?'}
      ORDER BY created_at DESC
    `;
    const [registrations] = await db.query(query, user.role === 'admin' ? [] : [user.id]);

    return res.json(
      registrations.map((registration) => ({
        ...registration,
        submittedAt: toDateString(registration.submittedAt),
        details: parseJsonField(registration.details),
      })),
    );
  } catch (err) {
    return handleApiError(res, err, 'Error fetching registrations.');
  }
}
