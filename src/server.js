import express from 'express';
import configViewEngine from './config/view_engine.js';
import 'dotenv/config';
import initWebRoute from './route/web.js';
import initAPIRoute from './route/api.js';


const app = express();
const port = process.env.port || 3000;

//post data dùng 2 câu lệnh này để post thư viện có sẵn
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup viewEngine
configViewEngine(app);

//init web route
initWebRoute(app);

initAPIRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})