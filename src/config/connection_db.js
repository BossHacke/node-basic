import mysql from "mysql2/promise";

// create the connection to database callback
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejs_basic'
// });

//promise database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejs_basic",
});

// simple query
// connection.query(
//     'SELECT * FROM `users`',
//     function (err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         // console.log(fields); // fields contains extra meta data about results, if available
//     }
// );

export default pool;
