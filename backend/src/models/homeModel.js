const db = require('../config/database');

const getBudgets = async (id_person) => {
  const query = `
    SELECT id_budget, title, amount, record
    FROM budget
    WHERE id_person = $1;
  `;
  const result = await db.query(query, [id_person]);
  return result.rows.map(row => ({
    id_budget: row.id_budget,
    title: row.title,
    amount: parseFloat(row.amount),
    record: typeof row.record === 'string' ? JSON.parse(row.record) : row.record
  }));
};

const getRecord = async (id_budget) => {
  const query = 'SELECT record FROM budget WHERE id_budget = $1;';
  const result = await db.query(query, [id_budget]);
  if (!result.rows[0]) return [];
  const rec = result.rows[0].record;
  return typeof rec === 'string' ? JSON.parse(rec) : rec;
};

const createBudget = async (id_person, title, amount) => {
  const query = `
    INSERT INTO budget (id_person, title, amount, record)
    VALUES ($1, $2, $3, '[]'::jsonb)
    RETURNING id_budget, title, amount;
  `;
  const result = await db.query(query, [id_person, title, amount]);
  return {
    id_budget: result.rows[0].id_budget,
    title: result.rows[0].title,
    amount: parseFloat(result.rows[0].amount)
  };
};

const deleteBudget = async (id_budget) => {
  const query = 'DELETE FROM budget WHERE id_budget = $1;';
  return await db.query(query, [id_budget]);
};

const updateRecord = async (id_budget, record) => {
  const query = `
    UPDATE budget
    SET record = $2
    WHERE id_budget = $1
    RETURNING record;
  `;
  const recordValue = typeof record === 'string' ? record : JSON.stringify(record);
  const result = await db.query(query, [id_budget, recordValue]);
  if (!result.rows[0] || result.rows[0].record === null) {
    return [];
  }
  const rec = result.rows[0].record;
  return typeof rec === 'string' ? JSON.parse(rec) : rec;
};

const addIncome = async (id_person, amount) => {
  const query = `
    INSERT INTO income (id_person, amount)
    VALUES ($1, $2)
    ON CONFLICT (id_person)
    DO UPDATE SET amount = EXCLUDED.amount
    RETURNING amount;
  `;
  const result = await db.query(query, [id_person, amount]);
  return parseFloat(result.rows[0].amount);
};

const getIncome = async (id_person) => {
  const query = 'SELECT amount FROM income WHERE id_person = $1;';
  const result = await db.query(query, [id_person]);
  return result.rows[0] ? parseFloat(result.rows[0].amount) : 0;
};

module.exports = {
  getBudgets,
  getRecord,
  createBudget,
  deleteBudget,
  updateRecord,
  addIncome,
  getIncome
};