import pool from "../config/connection_db.js";
import multer from "multer";

let getHomePage = async (req, res) => {
  //kiểu mới ngắn hơn
  const [row, fields] = await pool.execute("SELECT * FROM users");
  return res.render("index.ejs", { dataUser: row });
  // logic
  //   let data = [];
  //kiểu callback cũ nên dùng promise
  // connection.query(
  //     'SELECT * FROM `users`',
  //     function (err, results, fields) {
  //         results.map((row) => {
  //             data.push({
  //                 id: row.id,
  //                 firstName: row.firstName,
  //                 lastName: row.lastName,
  //                 email: row.email,
  //                 address: row.address,
  //             })
  //         })
  //         return res.render('index.ejs', { dataUser: data });
  //     }
  // );
};

let getDetail = async (req, res) => {
  let userId = req.params.userId;
  let [user] = await pool.execute(`select * from users where id = ?`, [userId]);
  return res.send(JSON.stringify(user));
};

//post data
let createUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;

  await pool.execute('insert into users(firstName, lastName, email, address) values(?,?,?,?)', [firstName, lastName, email, address]);
  //redirect dùng để reload lại trang theo dấu '/'
  return res.redirect('/');
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute('delete from users where id = ?', [userId]);
  return res.redirect('/');
}

let editUser = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute('select * from users where id = ?', [userId]);
  return res.render('update.ejs', { dataUser: user[0] });
}

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);
  return res.redirect('/');
}

let uploadFile = (req, res) => {
  return res.render('upload_file.ejs');
}

const upload = multer().single('profile_pic');

let handleUploadFile = (req, res) => {
  // let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');

  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send('Please select an images to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
  });
}

export default { getHomePage, getDetail, createUser, deleteUser, editUser, updateUser, uploadFile, handleUploadFile };
