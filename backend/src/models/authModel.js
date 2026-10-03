const db = require('../config/database');

const getPersonByEmail = async (email) => {
  const query = `
    SELECT id_person, fname, lname, email, phash, confirmed, created, flg_premium, photo
    FROM person
    WHERE email = $1;
  `;
  const result = await db.query(query, [email]);
  return result.rows[0] || null;
};

const signUp = async (firstName, lastName, email, encryptedPassword, tokenConfirmation) => {
  const insertPersonQuery = `
    INSERT INTO person (fname, lname, email, phash, token, confirmed, flg_premium)
    VALUES ($1, $2, $3, $4, $5, FALSE, FALSE)
    RETURNING id_person;
  `;
  const result = await db.query(insertPersonQuery, [
    firstName,
    lastName,
    email,
    encryptedPassword,
    tokenConfirmation
  ]);

  const id_person = result.rows[0].id_person;

  // Assign initial free subscription plan (id 1)
  const insertSubscriptionQuery = `
    INSERT INTO suscription_by_person (id_person, id_suscription)
    VALUES ($1, 1)
    ON CONFLICT (id_person) DO NOTHING;
  `;
  await db.query(insertSubscriptionQuery, [id_person]);

  return id_person;
};

const confirmedAccount = async (email) => {
  const query = 'SELECT confirmed FROM person WHERE email = $1;';
  const result = await db.query(query, [email]);
  return result.rows[0] ? result.rows[0].confirmed : null;
};

const realConfirmation = async (token) => {
  const query = 'UPDATE person SET confirmed = TRUE, token = NULL WHERE token = $1;';
  return await db.query(query, [token]);
};

module.exports = {
  getPersonByEmail,
  signUp,
  confirmedAccount,
  realConfirmation
};