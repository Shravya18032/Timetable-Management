jest.setTimeout(15000);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const DailyTimetable = require('../models/DailyTimetable');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = await mongo.getUri();
await mongoose.connect(uri, { dbName: 'test' });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

describe('Timetable Model Test', () => {
  it('should create and save a timetable document', async () => {
    const timetable = new DailyTimetable({
      day: 'Monday',
      department: 'CSE',
      role: 'faculty',
      facultyId: 'FAC123',
      oddEvenTerm: 'Odd',
      duration: '9am-5pm',
      timetableSlots: [
        {
          time: '9:00 AM',
          courseCode: 'CS101',
          courseName: 'Intro to CS',
          facultyName: 'Dr. Smith',
          roomNo: 'B101',
          roundingsTime: '9:55 AM'
        }
      ]
    });

    const saved = await timetable.save();
    expect(saved._id).toBeDefined();
    expect(saved.day).toBe('Monday');
  });

  it('should fail to save if required fields are missing', async () => {
    const timetable = new DailyTimetable({
      role: 'faculty'
    });

    let err;
    try {
      await timetable.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
  });
});
