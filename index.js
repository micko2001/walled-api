require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./routers/users.router");

const app = express();
const port = 8080;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const app = express();
// const port = 8080;

// app.use(cors({ origin: "*" }));
// app.use(bodyParser.json());
// // meskipun get,put namun itu hanya kata saja, untuk best practice
// app.use(bodyParser.urlencoded({ extended: true }));

// const Pool = require("pg").Pool;
// // const pool = new Pool({
// //   user: "postgres",
// //   host: "localhost",
// //   database: "movie_db",
// //   password: "micko147",
// //   port: 5432,
// // });

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "walled",
//   password: "micko147",
//   port: 5432,
// });
// const getUsers = (req, res) => {
//   pool.query("Select * From users", (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.status(200).json(result.rows);
//   });
// };

// // const getMovies = (req, res) => {
// //   pool.query("Select * From movies", (err, result) => {
// //     if (err) {
// //       throw err;
// //     }
// //     res.status(200).json(result.rows);
// //   });
// // };

// const createMovie = (req, res) => {
//   const { movie_title, movie_genre, duration } = req.body;

//   pool.query(
//     "INSERT INTO movies (movie_title, movie_genre, duration) VALUES ($1,$2,$3) RETURNING *",
//     [movie_title, movie_genre, duration],
//     (err, results) => {
//       if (err) {
//         throw err;
//       }
//       res.status(201).send(`User added with ID: ${results.rows[0].movie_id}`);
//     }
//   );
// };

// const createUser = (req, res) => {
//   const { email, password, name, avatar } = req.body;

//   pool.query(
//     "INSERT INTO users (email, password,name, avatar) VALUES ($1,$2,$3,$4) RETURNING *",
//     [email, password, name, avatar],
//     (err, results) => {
//       if (err) {
//         throw err;
//       }
//       res.status(201).json({ data: "user ${results.rows[0].id}" });
//     }
//   );
// };

// const routeHandler = (req, res) => {
//   res.send("Hello World!!!!!!");
// };

// //endpoint pakai noun tidak boleh pakai kata kerja
// app.get("/", routeHandler);

// app.get("/users", getUsers);

// // app.get("/movies", getMovies);
// app.post("/movies", createMovie);

// app.post("/users", createUser);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
