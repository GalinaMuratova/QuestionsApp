import express from "express";
import mongoose from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";
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

usersRouter.get('/one/profile', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        return res.send(user);
    } catch (e) {
        next(e);
    }
});

usersRouter.get('/check/login', async (req, res, next) => {
    try {
      const userLogin = req.query.userLogin;
      if (!userLogin) {
        return res.status(400).send({ error: 'UserLogin is missing' });
      }
      const user = await User.findOne({ userLogin });
      if (user) {
        return res.send({ exists: true });
      }
      return res.send({ exists: false });
    } catch (e) {
      next(e);
    }
  });
  
usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = new User({
            firstName:  req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            birthYear: new Date(req.body.birthYear),
            phoneNumber: req.body.phoneNumber,
            image: req.file ? req.file.filename : null,
            userLogin: req.body.userLogin,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
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

usersRouter.patch('/profile/reset-password', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        user.password = req.body.password;
        await user.save();
        return res.send({ message: 'Password reset' });
    } catch (e) {
        next(e);
    }
});

usersRouter.patch('/profile/edit-photo', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        user.image = req.file ? req.file.filename : user.image;
        await user.save();
        return res.send({ message: 'Profile photo updated' });
    } catch (e) {
        next(e);
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
usersRouter.delete('/change/logout', async (req, res, next) => {
    try {
      const token = req.get('Authorization');
      
      if (!token) {
        return res.status(400).send({ error: 'No token' });
    }
  
      const user = await User.findOne({ token });
  
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
  
      user.generateToken();
      await user.save();
  
      return res.send({ message: 'Succes' });
    } catch (e) {
      next(e);
    }
  });

export default usersRouter;