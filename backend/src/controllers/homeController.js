const { getValuesByBudget } = require('../utils/calcs');
const models = require('./../models/homeModel');
const jwt = require('jsonwebtoken');

const getBudgets = async (req, res) => {
  try {
    const rawBudgets = await models.getBudgets(parseInt(req.query.id_person));
    const budgets = getValuesByBudget(rawBudgets || []);
    res.status(200).send(budgets);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msj: 'Error getting budgets' });
  }
};

const createBudget = async (req, res) => {
  const { token, title, amount } = req.body;
  try {
    const person = jwt.verify(token, process.env.JWT_KEY);
    const created = await models.createBudget(person.id_person, title, amount);
    const budget = {
      amount: created.amount,
      free: created.amount,
      id_budget: created.id_budget,
      progress: 0,
      record: null,
      spent: 0,
      title: created.title
    };
    res.status(200).send(budget);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msj: 'Problem to create budget' });
  }
};

const deleteBudget = async (req, res) => {
  const { id_budget } = req.query;
  try {
    await models.deleteBudget(id_budget);
    res.status(200).send({ msj: 'Budget deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msj: 'Error removing budget' });
  }
};

const updateRecord = async (req, res) => {
  const { id_budget, record } = req.body;
  try {
    const recordUpdated = await models.updateRecord(id_budget, record);
    res.status(200).send(recordUpdated);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msj: 'There is a problem to update record' });
  }
};

const addIncome = async (req, res) => {
  const { token, amount } = req.body;
  try {
    const person = jwt.verify(token, process.env.JWT_KEY);
    const income = await models.addIncome(person.id_person, amount); 
    res.status(200).send({ msj: 'Income inserted successfully', income: income });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msj: 'Problem when trying to insert income' });
  }
};

const getIncome = async (req, res) => {
  const token = req.query.token;
  try {
    const person = jwt.verify(token, process.env.JWT_KEY);
    const income = await models.getIncome(person.id_person);
    res.status(200).send({ income: income });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msj: 'Problem trying to get income' });
  }
};

module.exports = {
  getBudgets,
  createBudget,
  deleteBudget,
  updateRecord,
  addIncome,
  getIncome
};