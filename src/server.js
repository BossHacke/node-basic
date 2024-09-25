import express from 'express';
import configViewEngine from './config/view_engine.js';
import 'dotenv/config';
import initWebRoute from './route/web.js';


const app = express();
const port = process.env.port || 3000;
configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})