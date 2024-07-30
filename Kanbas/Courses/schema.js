import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  _id: { type: String, required: false },  // Using strings as IDs
  name: { type: String, required: false },
  number: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  department: { type: String, required: false },
  image: { type: String },
  credits: { type: Number, required: false },
  description: { type: String, required: false},
  author: { type: String }
}, { collection: 'courses' });

export default courseSchema;