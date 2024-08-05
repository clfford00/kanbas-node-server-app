import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';

import UserRoutes from './Users/routes.js';
import Hello from './Hello.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import QuizRoutes from './Kanbas/Quizzes/routes.js'; // Ensure this is imported

const app = express();

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection error:', error));

app.use(cors({
  credentials: true,
  origin: process.env.NETLIFY_URL || 'http://localhost:3000',
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'kanbas',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: CONNECTION_STRING }),
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    secure: process.env.NODE_ENV !== 'development'
  }
};

if (process.env.NODE_ENV !== 'development') {
  sessionOptions.proxy = true;
  sessionOptions.cookie.domain = process.env.NODE_SERVER_DOMAIN;
}

app.use(session(sessionOptions));
app.use(express.json());

Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app); // Ensure this is called

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
