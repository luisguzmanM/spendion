const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'prod';
const useSSL = process.env.DATABASE_SSL === 'true' || isProduction;

try {
  const dbParsed = new URL(process.env.DATABASE_URL);
  console.log(`🔌 DB attempting connection to: ${dbParsed.hostname}:${dbParsed.port}`);
} catch (e) {
  console.log('🔌 DB URL:', process.env.DATABASE_URL ? 'Defined' : 'Undefined');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

module.exports = pool;