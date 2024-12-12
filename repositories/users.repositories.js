const pool = require("../db/db");

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const createUser = async (user) => {
  const { email, name, password, avatar } = user;

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password,name, avatar) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, password, name, avatar]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};
const getUsers = async () => {
  try {
    const results = await pool.query("Select * From users");
    return results.rows;
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};

module.exports = { createUser, findUserByEmail, getUsers };
