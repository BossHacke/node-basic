import pool from '../config/connection_db.js';

//viết api
//json 1 dạng object
let getAllUser = async (req, res) => {
    const [row, fields] = await pool.execute("SELECT * FROM users");
    return res.status(200).json({
        message: 'ok',
        data: row
    });
}

let createUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'err'
        });
    }
    await pool.execute('insert into users(firstName, lastName, email, address) values(?,?,?,?)', [firstName, lastName, email, address]);
    return res.status(201).json({
        message: 'ok'
    });
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);
    return res.status(200).json({
        message: 'ok'
    });
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        });
    }
    await pool.execute('delete from users where id = ?', [userId]);
    return res.status(200).json({
        message: 'ok'
    });
}
export default { getAllUser, createUser, updateUser, deleteUser }