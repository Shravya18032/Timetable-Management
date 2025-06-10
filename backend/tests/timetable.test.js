const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const DailyTimetable = require('../models/DailyTimetable.js');
const jwt = require('jsonwebtoken');
const connectDB = require('../config/db');

const createToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

let testTimetableId;  // storing after fetch and used for deleteing.    
// ID comes from mongodb and not from our schema!

describe('Timetable Controller', () => {
  const token = createToken({
    facultyId: 'faculty123',
    role: 'faculty',
    department: 'CSE',
  });

  const timetableData = {
    department: 'CSE',
    semester: '6',
    section: 'A',
    day: 'Monday',
    timetable: [{ time: '9:00', subject: 'Math' }],
  };

  beforeAll(async () => {
    // ✅ Connect to DB before running any tests
    await connectDB();
    // ✅ Clean any existing test data
    await DailyTimetable.deleteMany({
      department: timetableData.department,
      semester: timetableData.semester,
      section: timetableData.section,
      day: timetableData.day,
    });
  });

  afterAll(async () => {
    // ✅ Disconnect from DB after all tests
    await mongoose.connection.close();
  });

  // it('should create or update a daily timetable', async () => {
  //   const res = await request(app)
  //     .post('/api/timetable/daily') //  correct path
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(timetableData);

  //   // const res = await request(app)
  //   //   .post('/api/timetable')
  //   //   .set('Authorization', `Bearer ${token}`)
  //   //   .send(timetableData);

  //   expect(res.statusCode).toBe(201);
  //   expect(res.body.message).toMatch(/created or updated/i);

  //   //  Save ID for deletion test
  //   const saved = await DailyTimetable.findOne({ department: 'CSE', day: 'Monday' });
  //   testTimetableId = saved?._id;
  // });

  it('should search timetable based on department and day', async () => {
    const res = await request(app)
      .get('/api/timetable/search?department=CSE&day=Monday')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].department).toBe('CSE');
  });

  // it('should delete the test timetable', async () => {
  //   // const res = await request(app)
  //   //   .delete('/api/timetable')
  //   //   .set('Authorization', `Bearer ${token}`)
  //   const res = await request(app)
  //     .delete(`/api/timetable/${testTimetableId}`) // 
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       department: timetableData.department,
  //       semester: timetableData.semester,
  //       section: timetableData.section,
  //       day: timetableData.day,
  //     });

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.message).toBe('Timetable deleted successfully');
  // });
});


// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');
// const User = require('../models/User');

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

// describe('User Model Test', () => {
//   it('should create & save a user successfully', async () => {
//     const user = new User({
//       name: 'John Doe',
//       email: 'john@example.com',
//       password: 'secure123',
//       role: 'student',
//       department: 'CSE',
//       semester: '5',
//       section: 'A'
//     });

//     const savedUser = await user.save();
//     expect(savedUser._id).toBeDefined();
//     expect(savedUser.name).toBe('John Doe');
//   });

//   it('should not save user without required fields', async () => {
//     const user = new User({ email: 'missing@example.com' });
//     let err;
//     try {
//       await user.save();
//     } catch (error) {
//       err = error;
//     }
//     expect(err).toBeDefined();
//   });
// });
