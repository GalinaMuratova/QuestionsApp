import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Question from "../models/Questions";

const questionsRouter = express.Router();

questionsRouter.get('/', async (req,res) => {
   try {
       const questions = await Question.find().populate('author', 'firstName').sort({ date: -1 });
       return res.send(questions);
   } catch {
       return res.sendStatus(500);
   }
});

questionsRouter.get('/:id', async (req,res) => {
    try {
        const question = await Question.findById(req.params.id).populate('author', 'firstName');
        if (!question) {
            return res.sendStatus(404);
        }
        return res.send(question);
    } catch {
        return res.sendStatus(500);
    }
});

questionsRouter.post('/', auth, async(req, res, next) => {
   try {
       const user = (req as RequestWithUser).user;
       const currentDate = new Date();

       const question = new Question ({
           author: user._id,
           title: req.body.title,
           date: currentDate,
           answers: [],
       });
       await question.save();
       return res.send(question);

   } catch (e) {
       if (e instanceof mongoose.Error.ValidationError) {
           return res.status(400).send(e);
       }
       next(e);
   }
});

questionsRouter.put('/:id', auth, async(req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const questionId = req.params.id;
        const { title } = req.body;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.sendStatus(404);
        }
        console.log(question.author);
        console.log(user._id);

        if ((question as any).author.toString() !== user._id.toString()) {
            return res.status(403).send({ error: "You cant edit this question" });
        }

        question.title = title;
        await question.save();

        return res.send(question);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

questionsRouter.patch('/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const questionId = req.params.id;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.sendStatus(404);
        }

        if ((question as any).author.toString() !== user._id.toString()) {
            return res.status(403).send({ error: "You are not authorized to edit this question" });
        }

        question.hidden = false;
        await question.save();

        return res.send(question);
    } catch (e) {
        next(e);
    }
});

questionsRouter.delete('/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const questionId = req.params.id;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.sendStatus(404);
        }

        if ((question as any).author.toString() !== user._id.toString()) {
            return res.status(403).send({ error: "You are not authorized to delete this question" });
        }

        await question.deleteOne();

        return res.send({ message: "Question deleted successfully" });
    } catch (e) {
        next(e);
    }
});

export default questionsRouter;