import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

let pool;
let initPromise;

function readSslConfig() {
  const sslMode = process.env.DB_SSL || process.env.MYSQL_SSL;
  const ca = process.env.DB_SSL_CA || process.env.MYSQL_SSL_CA;
  const normalizedSslMode = sslMode?.toLowerCase();

  if (!ca && !['true', '1', 'required', 'require'].includes(normalizedSslMode)) {
    return undefined;
  }

  const ssl = {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
  };

  if (ca) {
    ssl.ca = ca.replace(/\\n/g, '\n');
  }

  return ssl;
}

function parseDatabaseUrl(databaseUrl) {
  const url = new URL(databaseUrl);
  const database = url.pathname.replace(/^\//, '');

  if (!database) {
    throw new Error('DATABASE_URL must include a database name.');
  }

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(database),
  };
}

function createPoolConfig() {
  if (process.env.VERCEL && !process.env.DATABASE_URL && !process.env.DB_HOST) {
    throw new Error('Missing cloud database configuration. Set DATABASE_URL or DB_HOST/DB_USER/DB_PASSWORD/DB_NAME in Vercel Environment Variables.');
  }

  const baseConfig = process.env.DATABASE_URL
    ? parseDatabaseUrl(process.env.DATABASE_URL)
    : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'rise_foundation',
      };

  return {
    ...baseConfig,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 2),
    queueLimit: 0,
    enableKeepAlive: true,
    ssl: readSslConfig(),
  };
}

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(createPoolConfig());
  }

  return pool;
}

async function addColumnIfMissing(tableName, columnName, ddl) {
  const [columns] = await getPool().query(
    `SELECT COUNT(*) as count
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?
       AND COLUMN_NAME = ?`,
    [tableName, columnName],
  );

  if (columns[0].count === 0) {
    await getPool().query(`ALTER TABLE ${tableName} ADD COLUMN ${ddl}`);
  }
}

export async function ensureDatabase() {
  if (!initPromise) {
    initPromise = initializeDatabase();
  }

  return initPromise;
}

async function initializeDatabase() {
  const db = getPool();

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(50) NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'visitor',
      persona VARCHAR(50) NOT NULL DEFAULT 'siswa_sma',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await addColumnIfMissing('users', 'phone_number', 'phone_number VARCHAR(50) NULL AFTER full_name');

  await db.query(`
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

  await db.query(`
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

  await db.query(`
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

  await db.query(`
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

  await seedDefaults();
}

async function seedDefaults() {
  const db = getPool();
  const [userRows] = await db.query('SELECT COUNT(*) as count FROM users');

  if (userRows[0].count === 0) {
    const passwordHash = await bcrypt.hash('password123', 10);

    await db.query(
      `INSERT INTO users (id, email, password_hash, full_name, phone_number, role, persona)
       VALUES (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?)`,
      [
        'usr-default',
        'maharani@rise.org',
        passwordHash,
        'Maharani Syifatania',
        '08123456789',
        'visitor',
        'siswa_sma',
        'usr-admin',
        'admin@rise.org',
        passwordHash,
        'Evi Lestari',
        '08123456789',
        'admin',
        'mitra',
      ],
    );
  }

  const [regRows] = await db.query('SELECT COUNT(*) as count FROM registrations');
  if (regRows[0].count === 0) {
    await db.query(
      `INSERT INTO registrations (id, user_id, program_type, program_id, program_name, status, details, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'reg-001',
        'usr-default',
        'scholarship',
        'schol-prestasi',
        'Beasiswa Unggulan Prestasi RISE 2026',
        'submitted',
        JSON.stringify({ gpaScore: '89', essayContent: 'Memajukan literasi sains dan AI di Indonesia.' }),
        new Date('2026-06-25'),
        'reg-002',
        'usr-default',
        'camp_training',
        'camp-frontend',
        'Intensive Frontend React & Tailwind Web Bootcamp',
        'accepted',
        JSON.stringify({ experienceLevel: 'Beginner' }),
        new Date('2026-06-20'),
      ],
    );
  }

  const [loanRows] = await db.query('SELECT COUNT(*) as count FROM book_loans');
  if (loanRows[0].count === 0) {
    await db.query(
      `INSERT INTO book_loans (id, user_id, book_id, book_title, status, loan_date, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['loan-001', 'usr-default', 'book-kiat', 'Kiat Sukses Memperoleh Beasiswa Pendidikan Dunia', 'borrowed', '2026-06-28', new Date('2026-06-28')],
    );
  }

  const [inqRows] = await db.query('SELECT COUNT(*) as count FROM sponsor_inquiries');
  if (inqRows[0].count === 0) {
    await db.query(
      `INSERT INTO sponsor_inquiries (id, company_name, contact_name, email, phone, notes, submitted_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'inq-001',
        'PT TechSustain Corp',
        'Fahmi Ramadhan',
        'fahmi@techsustain.com',
        '08123456789',
        'Tertarik menjadi sponsor utama Beasiswa Kemitraan Korporat RISE 2026.',
        '2026-06-29',
        new Date('2026-06-29'),
      ],
    );
  }
}

export function toDateString(value) {
  if (!value) {
    return '';
  }

  try {
    return new Date(value).toISOString().split('T')[0];
  } catch {
    return value;
  }
}

export function parseJsonField(value) {
  if (!value) {
    return {};
  }

  if (typeof value !== 'string') {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
