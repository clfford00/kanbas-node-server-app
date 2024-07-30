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

const app = express();

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

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
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none', // Adjust sameSite based on environment
    secure: process.env.NODE_ENV !== 'development' // Secure cookies in production
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

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
