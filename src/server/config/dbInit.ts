import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export async function initializeDatabase(): Promise<void> {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'rise_foundation';

  console.log('Initializing database connection...');
  
  // Connection without database to create database if not exists
  const connection = await mysql.createConnection({
    host,
    user,
    password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  await connection.end();

  // Reconnect with database to create tables
  const dbConnection = await mysql.createConnection({
    host,
    user,
    password,
    database,
  });

  console.log('Creating database tables if not exists...');

  // 1. Table users
  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'visitor',
      persona VARCHAR(50) NOT NULL DEFAULT 'siswa_sma',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Table registrations
  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      program_type VARCHAR(50) NOT NULL,
      program_id VARCHAR(50) NOT NULL,
      program_name VARCHAR(255) NOT NULL,
      status VARCHAR(50) DEFAULT 'submitted',
      registered_class VARCHAR(50) NULL,
      wave VARCHAR(255) NULL,
      details JSON NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 3. Table library_members
  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS library_members (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL UNIQUE,
      member_name VARCHAR(255) NOT NULL,
      member_email VARCHAR(255) NOT NULL,
      is_active TINYINT(1) DEFAULT 1,
      joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 4. Table book_loans
  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS book_loans (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      book_id VARCHAR(50) NOT NULL,
      book_title VARCHAR(255) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      loan_date VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 5. Table sponsor_inquiries
  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS sponsor_inquiries (
      id VARCHAR(255) PRIMARY KEY,
      company_name VARCHAR(255) NOT NULL,
      contact_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      notes TEXT NULL,
      submitted_at VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default admin and user if not exists
  const [userRows]: any = await dbConnection.query('SELECT COUNT(*) as count FROM users');
  if (userRows[0].count === 0) {
    console.log('Seeding default users...');
    const hashedPwd = await bcrypt.hash('password123', 10);
    // Seed default visitor
    await dbConnection.query(`
      INSERT INTO users (id, email, password_hash, full_name, role, persona)
      VALUES (?, ?, ?, ?, ?, ?)
    `, ['usr-default', 'maharani@rise.org', hashedPwd, 'Maharani Syifatania', 'visitor', 'siswa_sma']);

    // Seed default admin
    await dbConnection.query(`
      INSERT INTO users (id, email, password_hash, full_name, role, persona)
      VALUES (?, ?, ?, ?, ?, ?)
    `, ['usr-admin', 'admin@rise.org', hashedPwd, 'Evi Lestari', 'admin', 'mitra']);
  }

  // Seed default registrations if empty
  const [regRows]: any = await dbConnection.query('SELECT COUNT(*) as count FROM registrations');
  if (regRows[0].count === 0) {
    console.log('Seeding default registrations...');
    await dbConnection.query(`
      INSERT INTO registrations (id, user_id, program_type, program_id, program_name, status, details, created_at)
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'reg-001', 'usr-default', 'scholarship', 'schol-prestasi', 'Beasiswa Unggulan Prestasi RISE 2026', 'submitted', JSON.stringify({ gpaScore: '89', essayContent: 'Memajukan literasi sains dan AI di Indonesia.' }), new Date('2026-06-25'),
      'reg-002', 'usr-default', 'camp_training', 'camp-frontend', 'Intensive Frontend React & Tailwind Web Bootcamp', 'accepted', JSON.stringify({ experienceLevel: 'Beginner' }), new Date('2026-06-20')
    ]);
  }

  // Seed default loans if empty
  const [loanRows]: any = await dbConnection.query('SELECT COUNT(*) as count FROM book_loans');
  if (loanRows[0].count === 0) {
    console.log('Seeding default loans...');
    await dbConnection.query(`
      INSERT INTO book_loans (id, user_id, book_id, book_title, status, loan_date, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, ['loan-001', 'usr-default', 'book-kiat', 'Kiat Sukses Memperoleh Beasiswa Pendidikan Dunia', 'borrowed', '2026-06-28', new Date('2026-06-28')]);
  }

  // Seed default sponsor inquiries if empty
  const [inqRows]: any = await dbConnection.query('SELECT COUNT(*) as count FROM sponsor_inquiries');
  if (inqRows[0].count === 0) {
    console.log('Seeding default sponsor inquiries...');
    await dbConnection.query(`
      INSERT INTO sponsor_inquiries (id, company_name, contact_name, email, phone, notes, submitted_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, ['inq-001', 'PT TechSustain Corp', 'Fahmi Ramadhan', 'fahmi@techsustain.com', '08123456789', 'Tertarik menjadi sponsor utama Beasiswa Kemitraan Korporat RISE 2026.', '2026-06-29', new Date('2026-06-29')]);
  }

  await dbConnection.end();
  console.log('Database initialization completed!');
}
