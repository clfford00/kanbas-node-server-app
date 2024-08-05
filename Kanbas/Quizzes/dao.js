import model from "./model.js";
import mongoose from "mongoose";

export const findAllQuizzes = () => {
  return model.find();
};

export const findQuizByID = (quizID) => {
  return model.findOne({ _id: quizID });
};

export const findQuizByCourse = async (courseID) => {
    console.log("Course ID in DAO:", courseID); // Debug log
    const quizzes = await model.find({ course: courseID });
    console.log("Quizzes in DAO:", quizzes); // Debug log
    return quizzes;
  };
  
export const addQuiz = (quiz) => {
  delete quiz._id;
  return model.create(quiz);
};

export const editQuiz = (quizID, quiz) => {
  return model.updateOne({ _id: quizID }, { $set: quiz });
};

export const deleteQuiz = (quizID) => {
  return model.deleteOne({ _id: quizID });
};
