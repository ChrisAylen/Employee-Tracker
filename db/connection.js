//const mysql = require("mysql2");
const postgres = require("postgres");
require('dotenv').config();


const connection = postgres({

  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

//const connection = postgres('')

// connection.connect(function (err) {
//   if (err) throw err;
// });

module.exports = connection;