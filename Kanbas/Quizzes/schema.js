import mongoose from "mongoose";
const { Schema } = mongoose;

const quizSchema = new Schema({
  title: { type: String, default: "New Quiz" },
  points: String,
  course: { type: String, required: true }, // Use 'course' instead of 'courseID'
  available_date: Date,
  due_date: Date,
  instructions: String,
  type: { type: String, default: "gradedQuiz" },
  assignment_group: { type: String, default: "quizzes" },
  shuffle: { type: Boolean, default: true },
  time_limit: { type: Boolean, default: true },
  time: { type: String, default: "20" },
  attempts: { type: Boolean, default: false },
  numberOfAttempts: { type: Number, default: 1 },
  until_date: Date,
  show_correct_answers: { type: Boolean },
  one_at_a_time: { type: Boolean, default: true },
  webcam: { type: Boolean, default: false },
  lock_after: { type: Boolean, default: false },
  access_code: String,
  new: { type: Boolean, default: true },
  published: { type: Boolean, default: false },
}, { collection: "quizzes" });

export default mongoose.model("QuizModel", quizSchema);
