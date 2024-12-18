const pool = require("../db/db");

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      `SELECT users.*, wallets.id AS wallet_id
       FROM users
       LEFT JOIN wallets ON wallets.user_id = users.id
       WHERE users.email = $1`,
      [email]
    );

    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const createUser = async (user) => {
  const { email, name, password, avatar, username } = user;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const userResult = await client.query(
      `INSERT INTO users (email, username, name, password, avatar) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, username, name, avatar`,
      [email, username, name, password, avatar]
    );
    const newUser = userResult.rows[0];

    const walletResult = await client.query(
      `INSERT INTO wallets (user_id, balance) 
       VALUES ($1, $2) 
       RETURNING id, account_number, balance, created_at, updated_at`,
      [newUser.id, 0.0]
    );
    const newWallet = walletResult.rows[0];

    await client.query("COMMIT");

    return {
      ...newUser,
      wallet: newWallet,
    };
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};
const getUsers = async () => {
  try {
    const results = await pool.query(
      "SELECT users.*, wallets.id AS wallet_id FROM users LEFT JOIN wallets ON wallets.user_id = users.id "
    );
    return results.rows;
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};

const findUserById = async (id) => {
  try {
    const result = await pool.query(
      "SELECT users.id, users.username, users.name, users.email, users.avatar, wallets.account_number, wallets.balance FROM users LEFT JOIN wallets ON users.id = wallets.user_id WHERE users.id = $1",
      [id]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const findWalletByUserId = async (userId) => {
  try {
    const query = `
      SELECT id, user_id, account_number, balance, created_at, updated_at
      FROM wallets
      WHERE user_id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Failed to fetch wallet by user ID.");
  }
};

const findWalletByWalletId = async (userId) => {
  try {
    const query = `
      SELECT id, user_id, account_number, balance, created_at, updated_at
      FROM wallets
      WHERE id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Failed to fetch wallet by user ID.");
  }
};

const findWalletById = async (walletId) => {
  try {
    const query = `
      SELECT id, user_id, account_number, balance, created_at, updated_at
      FROM wallets
      WHERE account_number = $1;
    `;
    const result = await pool.query(query, [walletId]);

    return result.rows[0];
  } catch (error) {
    throw new Error("Failed to fetch wallet by ID.");
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  getUsers,
  findUserById,
  findWalletById,
  findWalletByWalletId,
  findWalletByUserId,
};
