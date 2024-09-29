import express from "express";
import home_controller from "../controller/home_controller.js";

let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", home_controller.getHomePage);
  router.post('/create-user', home_controller.createUser);
  router.get("/detail/users/:userId", home_controller.getDetail);
  router.post('/delete-user', home_controller.deleteUser);
  router.get('/edit/user/:id', home_controller.editUser);
  router.post('/update-users', home_controller.updateUser);
  return app.use("/", router);
};

export default initWebRoute;
