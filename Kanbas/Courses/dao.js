import model from './model.js';

export const createCourse = (course) => {
  return model.create(course);
};

export const findAllCourses = () => {
  return model.find();
};

export const findCourseById = (courseId) => {
  return model.findById(courseId);
};

export const updateCourse = (courseId, course) => {
  return model.updateOne({ _id: courseId }, { $set: course }).exec();
};

export const deleteCourse = (courseId) => {
  return model.deleteOne({ _id: courseId });
};