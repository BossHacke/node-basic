import express from 'express';
import home_controller from '../controller/home_controller.js';

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', home_controller.getHomePage);
    // router.get('/', (req, res) => {
    //     return res.render('index.ejs');
    // })
    return app.use('/', router);
}

export default initWebRoute;