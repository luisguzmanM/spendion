const db = require('../config/database');

const upgradePlan = async (id_person) => {
  await db.query(
    'UPDATE suscription_by_person SET id_suscription = 2 WHERE id_person = $1;',
    [id_person]
  );
  await db.query(
    'UPDATE person SET flg_premium = TRUE WHERE id_person = $1;',
    [id_person]
  );
};

const getUserById = async (id_person) => {
  const result = await db.query(
    'SELECT fname, lname, email FROM person WHERE id_person = $1;',
    [id_person]
  );
  return result.rows[0];
};

module.exports = {
  upgradePlan,
  getUserById
};