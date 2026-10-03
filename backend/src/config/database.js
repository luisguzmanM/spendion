const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'prod';
const useSSL = process.env.DATABASE_SSL === 'true' || isProduction;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

module.exports = pool;