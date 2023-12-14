import dbConnection from "../../database/MySQL.database.js"

export const connectDatabase = async () => {
    return dbConnection
}


// example of query
// dbConnection.query(
//     'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );