const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users.repositories");
const { generateAccesToken } = require("../utils/auth.util");
const {
  UserAlreadyExistsError,
  AuthenticationError,
  NotFoundError,
} = require("../dto/customErrors");

const createUser = async (userData) => {
  console.log(userData);
  const existingUser = await userRepository.findUserByEmail(userData.email);

  if (existingUser.rows.length > 0) {
    throw new UserAlreadyExistsError();
  }
  console.log("cek");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = { ...userData, password: hashedPassword };
  console.log(userData);
  const createdUser = await userRepository.createUser(newUser);
  return createdUser;
};

const login = async (userData) => {
  const res = await userRepository.findUserByEmail(userData.email);
  const user = res.rows[0];
  if (!user) {
    throw new AuthenticationError();
  }
  console.log(user.password);
  const isPasswordMatched = await bcrypt.compare(
    userData.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AuthenticationError();
  }
  const token = generateAccesToken({
    email: user.email,
    id: user.id,
    walletId: user.wallet_id,
  });
  return token;
};

const getUserById = async (id) => {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const data = {
    ...user,
    wallet: {
      account_number: user.account_number,
      balance: user.balance,
    },
  };
  console.log(data);
  return {
    ...user,
    wallet: {
      account_number: user.account_number,
      balance: user.balance,
    },
  };
};

module.exports = { createUser, login, getUserById };
