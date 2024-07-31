import model from "./model.js";

export const createModule = async (courseId, module) => {
  module.course = courseId;  // Assign the course ID to the module
  return await model.create(module);
};

export const deleteModule = async (moduleId) => {
  return await model.deleteOne({ _id: moduleId });
};

export const findModulesForCourse = async (courseId) => {
  return await model.find({ course: courseId }).populate('course');
};

export const updateModule = async (moduleId, module) => {
  return await model.updateOne({ _id: moduleId }, { $set: module });
};
