const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "walled",
  password: "micko147",
  port: 5432,
});

module.exports = pool;
