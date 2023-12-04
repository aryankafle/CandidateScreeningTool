const mysql = require('mysql2')
const express = require("express");
const PORT = process.env.PORT || 3001
const app = express();
require("dotenv").config()

export default queryDatabase = () => {
  const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: 'candidate',
    password: process.env.MYSQL_PASSWORD,
    database: 'CST_DB'
  })

  db.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
      } else {
        console.log('Connected to MySQL database');
      }
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});