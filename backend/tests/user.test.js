jest.setTimeout(15000);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');

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

describe('User Model Test', () => {
  it('should create & save a user successfully', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secure123',
      role: 'student',
      department: 'CSE',
      semester: '5',
      section: 'A'
    });

    const savedUser = await user.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe('John Doe');
  });

  it('should not save user without required fields', async () => {
    const user = new User({ email: 'missing@example.com' });
    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
  });
});
