import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'rise_foundation_super_secret_jwt_key_2026';

export function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      persona: user.persona,
      fullName: user.fullName,
    },
    JWT_SECRET,
    { expiresIn: '7d' },
  );
}

export function mapUser(row) {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
    persona: row.persona,
    phoneNumber: row.phone_number || '',
    createdAt: row.created_at,
  };
}

export function getToken(req) {
  const authHeader = req.headers.authorization || '';
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
}

export function requireUser(req) {
  const token = getToken(req);

  if (!token) {
    const error = new Error('Authorization token required.');
    error.statusCode = 401;
    throw error;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    const error = new Error('Invalid or expired token.');
    error.statusCode = 403;
    throw error;
  }
}

export function requireAdmin(req) {
  const user = requireUser(req);

  if (user.role !== 'admin') {
    const error = new Error('Admin privileges required.');
    error.statusCode = 403;
    throw error;
  }

  return user;
}

export function methodNotAllowed(res, methods) {
  res.setHeader('Allow', methods);
  return res.status(405).json({ message: 'Method not allowed' });
}

export function handleApiError(res, error, fallbackMessage = 'Server error.') {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error(fallbackMessage, error);
  }

  return res.status(statusCode).json({
    message: statusCode >= 500 ? fallbackMessage : error.message,
    ...(process.env.NODE_ENV !== 'production' && statusCode >= 500 ? { error: error.message } : {}),
  });
}
