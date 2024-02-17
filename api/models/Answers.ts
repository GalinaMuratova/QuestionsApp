import mongoose, { Schema} from 'mongoose';
import User from "./User";

const AnswerSchema = new Schema({
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
});

const Answer = mongoose.model('Answer', AnswerSchema);
export default Answer;