import { HydratedDocument } from 'mongoose';
import { IUser } from '../types';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUser>;
}

const auth = async (expReq: Request, res: Response, next: NextFunction) => {
  const req = expReq as RequestWithUser;
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).send({ error: 'No token' });
  }

  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).send({ error: 'Wrong token' });
  }
  req.user = user;
  next();
};

export default auth;