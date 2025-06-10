// tests/user.test.js

// jest.setTimeout(15000);
// const dotenv =  require('dotenv');
// dotenv.config({ path: '.env.test' });

// const request = require('supertest');
// const app = require('../app');
// const mongoose = require('mongoose');
// const User = require('../models/User.js');
// const jwt = require('jsonwebtoken');
// // require('dotenv').config(".env.test");

// const createToken = (user) => {
//   return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// describe('User Controller', () => {
//   let testUser;
//   let token;

//   beforeAll(async () => {
//     testUser = {
//       username: 'testuser',
//       email: 'testuser@example.com',
//       password: 'testpassword',
//       role: 'admin',
//     };
//     await User.deleteOne({ email: testUser.email });
//     token = createToken({
//       id: 'dummyid',
//       role: 'admin',
//     });
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   it('should register a new user', async () => {
//     const res = await request(app)
//       .post('/api/users/register')
//       .set('Authorization', `Bearer ${token}`)
//       .send(testUser);

//     expect(res.statusCode).toBe(201);
//     expect(res.body).toHaveProperty('message', 'User registered successfully');
//     expect(res.body.user.email).toBe(testUser.email);
//   });

//   it('should fetch all users (admin only)', async () => {
//     const res = await request(app)
//       .get('/api/users')
//       .set('Authorization', `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   it('should delete the test user', async () => {
//     const user = await User.findOne({ email: testUser.email });
//     const res = await request(app)
//       .delete(`/api/users/${user._id}`)
//       .set('Authorization', `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('message', 'User deleted successfully');
//   });
// });


// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');
// const DailyTimetable = require('../models/DailyTimetable');

// let mongo;

// beforeAll(async () => {
//   mongo = await MongoMemoryServer.create();
//   await mongoose.connect(mongo.getUri(), { dbName: 'test' });
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongo.stop();
// });

// describe('Timetable Model Test', () => {
//   it('should create and save a timetable document', async () => {
//     const timetable = new DailyTimetable({
//       day: 'Monday',
//       department: 'CSE',
//       role: 'faculty',
//       facultyId: 'FAC123',
//       oddEvenTerm: 'Odd',
//       duration: '9am-5pm',
//       timetableSlots: [
//         {
//           time: '9:00 AM',
//           courseCode: 'CS101',
//           courseName: 'Intro to CS',
//           facultyName: 'Dr. Smith',
//           roomNo: 'B101',
//           roundingsTime: '9:55 AM'
//         }
//       ]
//     });

//     const saved = await timetable.save();
//     expect(saved._id).toBeDefined();
//     expect(saved.day).toBe('Monday');
//   });

//   it('should fail to save if required fields are missing', async () => {
//     const timetable = new DailyTimetable({
//       role: 'faculty'
//     });

//     let err;
//     try {
//       await timetable.save();
//     } catch (error) {
//       err = error;
//     }

//     expect(err).toBeDefined();
//   });
// });


// moDified ... amlost testable script:
const dotenv = require('dotenv');
// dotenv.config({ path: '.env.test' });
dotenv.config({ path: require('path').resolve(__dirname, '../.env.test') });


const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const connectDB = require('../config/db.js'); // adjust path if needed

const createToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// GLoablly defining the test user.
// const testUser = {
//       name: 'testuser',
//       email: 'testuser@example.com',
//       password: 'testpassword',
//       role: 'admin',
//       department: 'CSE'
//     };

describe('User Controller', () => {
  let testUser;
  let token;

  beforeAll(async () => {
    // Connect to MongoDB before tests
    await connectDB();

    testUser = {
      name: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
      role: 'admin',
      department: 'CSE'
    };

    await User.deleteOne({ email: testUser.email });

    
    token = createToken({
      id: 'dummyid',
      role: 'admin',
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .set('Authorization', `Bearer ${token}`)
      .send(testUser);

    // console.log(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body.user.email).toBe(testUser.email);
  });

  it('should fetch all users (admin only)', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // it('should delete the test user', async () => {
  //   const user = await User.findOne({ email: testUser.email });
  //   console.log('Test User ID:', user._id); // Add this line
  //   // console.log('Token:', token);             // And this line


  //   const res = await request(app)
  //     .delete(`/api/users/${user._id}`)
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toHaveProperty('message', 'User deleted successfully');
  // });
});
