import mongoose, { Schema} from 'mongoose';
import User from "./User";

const QuestionSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'Author doesnt exist',
        }
    },
    date: {
        type: Date,
    },
    title: {
        type: String,
        required: true,
    },
    hidden: {
        type: Boolean,
        default: true
    },
    answers: [{
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date,
            default: Date.now
        },
        title: String
    }],
});

const Question = mongoose.model('Question', QuestionSchema);
export default Question;