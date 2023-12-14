import dbConnection from "../../database/MySQL.database.js"

export async function connectDatabase(sql, params) {

    return dbConnection
}

// dbConnection.query(
//     "INSERT INTO person (username, email, password) VALUES ('chris', 'chrjo24@bergen.org', 'apple')"
// )

// prepared statements protect against injection attacks
dbConnection.execute(
    "INSERT INTO person (username, email, password) VALUES (?, ?, ?)",
    ['chris', 'chrjo24@bergen.org', 'apple']
)



dbConnection.query(
    'SELECT * FROM person',
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server
    }
);
