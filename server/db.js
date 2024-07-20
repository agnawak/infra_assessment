const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pw",
  database: "InfraDB",
});

module.exports = connection;
