import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // Using strings as IDs
  name: { type: String, required: true },
  description: { type: String },
  course: { type: String, ref: 'CourseModel', required: true },  // Reference to course ID
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LessonModel' }]
}, { collection: 'modules' });

export default moduleSchema;
