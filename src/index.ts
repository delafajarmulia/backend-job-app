import express, { urlencoded } from 'express';
import mongoose from 'mongoose';

import AuthRouter from './router/authRoute';
import CategoryRouter from './router/categoryRoute';

const app = express();

const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/db_final_project').then(() => {
    console.log('DB connected');
}).catch((error) => {
    console.log('failed to connect db', error);
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const mainURI = '/api/v1'

app.use(mainURI + '/auth', AuthRouter)
app.use(mainURI + '/category', CategoryRouter)

app.listen(PORT, () => {
    console.log('this app listening on port ' + PORT)
})