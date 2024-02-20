import mongoose, { Model, model } from "mongoose";
import { randomUUID } from "crypto";
import bcrypt from 'bcrypt';
import { IUser } from "../types";

const SALT_WORK_FACTOR = 10;

interface IUserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
    generatePassword(): void;
}
  
type UserModel = Model<IUser, {}, IUserMethods>;

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    birthYear: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordConfirm: {
        type: String,
        required: false,
    },
    userLogin: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
    },
    statusUser: {
        type: Boolean,
        default: false,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
});

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generatePassword = function () {
    this.password = '12345';
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

const User = model<IUser, UserModel>('User', UserSchema);
export default User;