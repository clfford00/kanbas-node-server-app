import model from './model.js';

export const createModule = (module) => {
  return model.create(module);
};

export const findAllModules = () => {
  return model.find().populate('course');
};

export const findModuleById = (moduleId) => {
  return model.findById(moduleId).populate('course');
};

export const findModulesByCourseId = (courseId) => {
  return model.find({ course: courseId }).populate('course');
};

export const updateModule = (moduleId, module) => {
  return model.updateOne({ _id: moduleId }, { $set: module }).exec();
};

export const deleteModule = (moduleId) => {
  return model.deleteOne({ _id: moduleId });
};