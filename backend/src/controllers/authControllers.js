const model = require('../models/authModel');
require('dotenv').config();
const encryptor = require('simple-encryptor')(process.env.ENCRYPTOR_KEY);
const jwt = require('jsonwebtoken');
const emails = require('./../utils/emails');
const tokenConfirm = require('./../utils/token');

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const encryptedPassword = encryptor.encrypt(password);
  const tokenConfirmation = tokenConfirm.generarID();

  try {
    const existingPerson = await model.getPersonByEmail(email);
    if (existingPerson) {
      return res.status(400).send({ msj: 'User already exists' });
    }

    await model.signUp(firstName, lastName, email, encryptedPassword, tokenConfirmation);

    await emails.emailRegistro({
      name: firstName,
      email: email,
      token: tokenConfirmation
    });

    res.status(200).send({ msj: 'Signup successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send('There is a signup problem. Try again.');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await model.getPersonByEmail(email);

    if (!user) {
      return res.status(400).send({ msj: 'User do not exists' });
    }

    if (user.confirmed === false) {
      return res.status(400).send({ msj: 'You need to confirm your account. Please, check your email.' });
    }

    const decryptedPassword = encryptor.decrypt(user.phash);

    if (decryptedPassword !== password) {
      return res.status(400).send({ msj: 'Wrong password' });
    }

    const person = {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      id_person: user.id_person,
      confirmed: user.confirmed,
      created: user.created,
      flg_premium: user.flg_premium
    };

    const token = jwt.sign(person, process.env.JWT_KEY);

    return res.status(200).send({ msj: 'Login successful', person: person, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msj: 'Error trying to login' });
  }
};

const confirmUserAccount = async (req, res) => {
  const token = req.body.token;
  try {
    await model.realConfirmation(token);
    res.status(200).send({ msj: 'Account confirmed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error trying to confirm account');
  }
};

module.exports = {
  signup,
  confirmUserAccount,
  login
};