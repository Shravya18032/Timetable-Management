// const express = require('express');
// const connectDB = require('./config/db');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = require('path');

// dotenv.config(); // Load env vars first

// const authRoutes = require('./routes/authRoutes');
// const timetableRoutes = require('./routes/timetableRoutes');
// const userRoutes = require('./routes/userRoutes');
// // const timetableRoutes = require('./routes/timetableRoutes');



// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Static folder for uploads
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/auth', authRoutes);      // For register and login
// app.use('/api/timetable', timetableRoutes);
// app.use('/api/users', userRoutes);
// // app.use('/api/timetable', timetableRoutes); //Correct

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// ✅ Connect to MongoDB only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/users', userRoutes);

module.exports = app;

//  Start server only if run directly (not when testing)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
