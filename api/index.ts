import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import usersRouter from './routers/usersRouter';
import questionsRouter from './routers/qustionsRouter';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);


const run = async () => {
    await mongoose.connect('mongodb://localhost/questions');
    app.listen(port, ()=> {
        console.log(`Server started on ${port} port`);
    });
};

run().catch(e => console.error(e));