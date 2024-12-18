const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controllers");
const authenticateToken = require("../middleware/auth.middleware");

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.post("/auth/login", userController.login);
router.get("/profile", authenticateToken, userController.getUserById);

module.exports = router;
