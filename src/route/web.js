import express from "express";
import home_controller from "../controller/home_controller.js";
import appRoot from "app-root-path";
import multer from "multer";
import path from "path";

let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/images/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
  router.get("/", home_controller.getHomePage);
  router.post('/create-user', home_controller.createUser);
  router.get("/detail/users/:userId", home_controller.getDetail);
  router.post('/delete-user', home_controller.deleteUser);
  router.get('/edit/user/:id', home_controller.editUser);
  router.post('/update-users', home_controller.updateUser);
  router.get('/upload', home_controller.uploadFile);
  router.post('/upload-profile-pic', upload.single('profile_pic'), home_controller.handleUploadFile);
  return app.use("/", router);
};

export default initWebRoute;
