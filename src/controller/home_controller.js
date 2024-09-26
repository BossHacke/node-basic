import connection from "../config/connection_db.js";

let getHomePage = (req, res) => {
    // logic
    let data = [];
    //kiểu callback cũ nên dùng promise
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            // data = results.map((row) => { return row });
            results.map((row) => {
                data.push({
                    id: row.id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                    address: row.address,
                })
            })
            return res.render('index.ejs', { dataUser: data });
        }
    );
}

export default { getHomePage };