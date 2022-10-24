"use strict";
const mysql = require("mysql2/promise");

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME } =
  process.env;

let pool;

const getDB = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: DATABASE_HOST,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      connectionLimit: 10,
      timezone: "Z",
    });
  }
  return await pool.getConnection();
};

module.exports = getDB;
