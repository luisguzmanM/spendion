const model = require('../models/settingModel');

const updateDataUser = async (req, res) => {
  const { id_person, fname, lname, photo } = req.body;
  try {
    const userDataUpdated = await model.updatePerson(id_person, fname, lname, photo);
    res.status(200).send({ msj: 'Updated', person: userDataUpdated });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error trying to update profile');
  }
};

module.exports = {
  updateDataUser
};