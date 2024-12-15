const express = require("express");
const { createUser, loginUser } = require("../controllers/users.controllers");

const user = express.Router();


user.post('/register', createUser);
user.post('/login', loginUser);

module.exports = user;