import express from 'express';
import api_controller from '../controller/api_controller.js';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', api_controller.getAllUser);
    router.put('/update-user', api_controller.updateUser);
    router.post('/create-user', api_controller.createUser);
    router.delete('/delete-user/:id', api_controller.deleteUser);

    return app.use('/api/v1', router);
}

export default initAPIRoute;