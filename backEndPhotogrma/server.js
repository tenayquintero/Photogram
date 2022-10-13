"use strict";
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { newUser } = require("./controllers/user");

const { PORT } = process.env;

const app = express();
app.use(morgan("dev"));

//user
app.post("/user", newUser);

app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

app.listen(PORT, () => {
  console.log("Hellooo 👻");
});
