import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import { imagesUpload } from "../multer";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.get('/',auth, permit('admin'), async(req, res) => {
    try {
        const users = await User.find();
        return res.send(users);
      } catch {
        return res.sendStatus(500);
      }
});

usersRouter.get('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        return res.send(user);
    } catch (e) {
        return next(e);
    }
});

usersRouter.post('/', imagesUpload.single('image'), async(req, res, next) => {
    try {
        const user= new User({
            firstName:  req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            birthYear: req.body.birthYear,
            phoneNumber: req.body.phoneNumber,
            image: req.file ? req.file.filename : null,
            userLogin: req.body.userLogin,
            password: req.body.password,
        }); 
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

usersRouter.post('/admin', auth, permit('admin'), imagesUpload.single('image'), async(req, res, next) => {
    try {
        const user= new User({
            firstName:  req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            birthYear: req.body.birthYear,
            phoneNumber: req.body.phoneNumber,
            image: req.file ? req.file.filename : null,
            userLogin: req.body.userLogin,
            statusUser: true
        }); 
        user.generateToken();
        user.generatePassword();
        await user.save();
        return res.send(user);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({ userLogin: req.body.userLogin });
    
        if (!user) {
          return res.status(400).send({ error: 'Wrong login or password' });
        }
    
        const isMatch = await user.checkPassword(req.body.password);
    
        if (!isMatch) {
          return res.status(400).send({ error: 'Wrong login or password' });
        }
    
        user.generateToken();
        await user.save();
    
        return res.send({ message: 'Username and password correct', user });
      } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
          return res.status(400).send(e);
        }
        return next(e);
      }
});

usersRouter.patch('/reset-password/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.password = '123456';
        await user.save();
        return res.send({ message: 'Password reset successfully' });
    } catch (error) {
        return next(error);
    }
});

usersRouter.patch('/:id/authorize', auth, permit('admin'), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.statusUser = true;
        await user.save();
        return res.send({ message: 'User authorization confirmed' });
    } catch (error) {
        return next(error);
    }
});

usersRouter.put('/:id', auth, permit('admin'), imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.middleName = req.body.middleName;
        user.birthYear = req.body.birthYear;
        user.phoneNumber = req.body.phoneNumber;
        user.image = req.file ? req.file.filename : user.image;
        user.userLogin = req.body.userLogin;
        await user.save();
        return res.send(user);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

usersRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        await user.deleteOne();
        return res.send({ message: 'User deleted successfully' });
    } catch (e) {
        return next(e);
    }
});

export default usersRouter;