const userRepository = require("../repositories/users.repositories");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.email);
  if (user.rows.length > 0) {
    throw new Error("User already exist");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const newUser = { ...userData, password: hashedPassword };

  user = await userRepository.createUser(newUser);
  return user;
};
const getUsers = async () => {
  const user = await userRepository.getUsers();
  return user;
};
const login = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.email);
  if (user.rows.length === 0) {
    throw new Error("User does not exist");
  }
  const isValid = await bcrypt.compare(
    userData.password,
    user.rows[0].password
  );
  return isValid;
};

module.exports = { createUser, getUsers, login };
