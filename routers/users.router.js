const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controllers");

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/login", userController.login);

module.exports = router;
