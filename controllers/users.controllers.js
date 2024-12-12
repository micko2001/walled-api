const Joi = require("joi");
const userService = require("../services/users.services");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  avatar: Joi.string().optional(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await userService.createUser(value);
    res.status(201).json({ data: user });
  } catch (error) {
    if (error === "User already exist") {
      return res.status(400).json({ error: error.message });
    }
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await userService.getUsers();
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await userService.login(value);
    res.status(202).json({ data: user });
  } catch (err) {
    if (err === "User does not exist") {
      return res.status(404).json({ error: err.message });
    }
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = { createUser, getUsers, login };
