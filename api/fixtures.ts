import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collection were not present');
  }

  await User.create(
    {
      firstName:'Anna',
      lastName:'May',
      middleName:'Ivanova',
      birthYear:'1980-07-11',
      phoneNumber:'0708223311',
      statusUser: true,
      userLogin:'a.may',
      password: '123',
      image:'anna.jpg',
      token: crypto.randomUUID(),
      role: 'user',
    },
    {
        firstName:'Sam',
        lastName:'Smith',
        middleName:'La',
        birthYear:'1970-07-11',
        phoneNumber:'0550050505',
        statusUser: false,
        userLogin:'s.smith',
        password: '456',
        image:'sam.jpg',
        token: crypto.randomUUID(),
        role: 'user',
      },
    {
        firstName:'Admin',
        lastName:'Admin',
        middleName:'Admin',
        birthYear:'1988-07-11',
        phoneNumber:'0708777777',
        statusUser: true,
        userLogin:'admin',
        password: '123456',
        image:'admin.jpg',
        token: crypto.randomUUID(),
        role: 'admin',
      },
  );
  await db.close();
};
run().catch(console.error);