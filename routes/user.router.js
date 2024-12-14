const express = require("express");
const { createUser } = require("../controllers/users.controllers");

const user = express.Router();


user.post('/register', createUser);

module.exports = user;