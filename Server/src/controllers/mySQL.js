import dotenv from "dotenv"
import mysql from "mysql2"

dotenv.config()



export const queryDatabase = () => {
  const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: 'candidate',
    password: process.env.MYSQL_PASSWORD,
    database: 'capstone_2324_candidate'
  })

  db.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
      } else {
        console.log('Connected to MySQL database');
      }
  });
}