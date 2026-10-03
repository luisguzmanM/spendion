const db = require('../config/database');

const updatePerson = async (id_person, fname, lname, photo) => {
  const query = `
    UPDATE person
    SET fname = $2,
        lname = $3,
        photo = $4
    WHERE id_person = $1
    RETURNING id_person, fname, lname, email, photo, confirmed, created, flg_premium;
  `;
  const result = await db.query(query, [id_person, fname, lname, photo]);
  return result.rows[0];
};

module.exports = {
  updatePerson
};