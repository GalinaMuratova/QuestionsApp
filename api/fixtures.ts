import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Question from './models/Questions';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;
  const currentDate = new Date();

  try {
    await db.dropCollection('users');
    await db.dropCollection('questions');
  } catch (e) {
    console.log('Collection were not present');
  }

  const [user1, user2, user3] = await User.create(
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

  const [post1, post2, post3, post4] =await Question.create(
    {
      author: user1._id,
      title: 'В чем смысл жизни',
      date: currentDate,
      hidden: false
   }, {
       author: user1._id,
       title: 'Где купить розовую воду для борща',
       date: currentDate,
       hidden: false
   }, {
       author: user3._id,
       title: 'Как быстро стать миллионершей',
       date: currentDate,
       hidden: false
   }, {
       author: user3._id,
       title: 'Почему Раскольников убил старушку',
       date: currentDate
   }
  );
  await db.close();
};
run().catch(console.error);