import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Database connection error: ", err));

app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: CONNECTION_STRING
  })
}));

// Routes
import UserRoutes from './routes';
UserRoutes(app);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
