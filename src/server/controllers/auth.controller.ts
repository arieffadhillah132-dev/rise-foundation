import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { AuthenticatedRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'rise_foundation_super_secret_jwt_key_2026';

export const register = async (req: AuthenticatedRequest, res: Response) => {
  const { fullName, email, password, phoneNumber, role, persona } = req.body;

  if (!fullName || !email || !password || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user exists
    const [existing]: any = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const id = 'usr-' + Math.random().toString(36).substr(2, 9);
    const passwordHash = await bcrypt.hash(password, 10);
    const userRole = role || 'visitor';
    const userPersona = persona || 'siswa_sma';

    await pool.query(
      `INSERT INTO users (id, email, password_hash, full_name, role, persona)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, email, passwordHash, fullName, userRole, userPersona]
    );

    const token = jwt.sign(
      { id, email, role: userRole, persona: userPersona, fullName },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      token,
      user: {
        id,
        email,
        fullName,
        role: userRole,
        persona: userPersona,
        phoneNumber,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
};

export const login = async (req: AuthenticatedRequest, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const [users]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, persona: user.persona, fullName: user.full_name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        persona: user.persona,
        phoneNumber: '08123456789', // Simulated fallback or can be empty since not strictly verified
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login.', error: error.message });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  try {
    const [users]: any = await pool.query('SELECT id, email, full_name, role, persona FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = users[0];
    return res.json({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      persona: user.persona,
      phoneNumber: '08123456789',
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error retrieving user profile.', error: error.message });
  }
};

export const getRegistrations = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  try {
    let registrations: any[];
    if (req.user.role === 'admin') {
      [registrations] = await pool.query(
        'SELECT id, user_id as userId, program_type as programType, program_id as programId, program_name as programName, status, created_at as submittedAt, details FROM registrations ORDER BY created_at DESC'
      );
    } else {
      [registrations] = await pool.query(
        'SELECT id, user_id as userId, program_type as programType, program_id as programId, program_name as programName, status, created_at as submittedAt, details FROM registrations WHERE user_id = ? ORDER BY created_at DESC',
        [req.user.id]
      );
    }

    // Format fields correctly
    const formatted = registrations.map(reg => {
      let submittedDate = '';
      if (reg.submittedAt) {
        try {
          submittedDate = new Date(reg.submittedAt).toISOString().split('T')[0];
        } catch {
          submittedDate = reg.submittedAt;
        }
      }
      return {
        ...reg,
        submittedAt: submittedDate,
        details: typeof reg.details === 'string' ? JSON.parse(reg.details) : reg.details,
      };
    });

    return res.json(formatted);
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    return res.status(500).json({ message: 'Error fetching registrations.', error: error.message });
  }
};

export const updateRegistrationStatus = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required.' });
  }

  try {
    const [result]: any = await pool.query(
      'UPDATE registrations SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Registration not found.' });
    }

    return res.json({ message: 'Registration status updated successfully.' });
  } catch (error: any) {
    console.error('Error updating registration:', error);
    return res.status(500).json({ message: 'Error updating registration.', error: error.message });
  }
};

export const getSponsorInquiries = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [inquiries]: any = await pool.query(
      'SELECT id, company_name as companyName, contact_name as contactName, email, phone, notes, submitted_at as submittedAt FROM sponsor_inquiries ORDER BY created_at DESC'
    );
    return res.json(inquiries);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching sponsor inquiries.', error: error.message });
  }
};

export const createSponsorInquiry = async (req: AuthenticatedRequest, res: Response) => {
  const { companyName, contactName, email, phone, notes } = req.body;

  if (!companyName || !contactName || !email || !phone) {
    return res.status(400).json({ message: 'All inquiry details are required.' });
  }

  try {
    const id = 'inq-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const submittedAt = new Date().toISOString().split('T')[0];

    await pool.query(
      `INSERT INTO sponsor_inquiries (id, company_name, contact_name, email, phone, notes, submitted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, companyName, contactName, email, phone, notes, submittedAt]
    );

    return res.status(201).json({
      message: 'Sponsorship inquiry submitted successfully.',
      inquiry: {
        id,
        companyName,
        contactName,
        email,
        phone,
        notes,
        submittedAt,
      },
    });
  } catch (error: any) {
    console.error('Sponsor inquiry error:', error);
    return res.status(500).json({ message: 'Error submitting sponsor inquiry.', error: error.message });
  }
};
