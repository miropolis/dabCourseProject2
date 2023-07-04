import { sql } from "../database/database.js";

const findQuestion = async (q_id) => {
  return await sql`SELECT * FROM questions WHERE id = ${q_id};`;
};

const findCourseQuestions = async (c_id) => {
  return await sql`SELECT * FROM questions WHERE course_id = ${c_id};`;
};

const findCourseQuestionAnswers = async (q_id) => {
  return await sql`SELECT * FROM answers WHERE question_id = ${q_id};`;
};

const writeCourseQuestion = async (c_id, q_title, q_content) => {
  return await sql`INSERT INTO questions (course_id, title, question_content) VALUES (${c_id}, ${q_title}, ${q_content});`
};

const writeCourseQuestionAnswer = async (c_id, q_id, q_title, q_content) => {
  return await sql`INSERT INTO answers (course_id, question_id, title, answer_content) VALUES (${c_id}, ${q_id}, ${q_title}, ${q_content});`
};

export { findQuestion, findCourseQuestions, findCourseQuestionAnswers, writeCourseQuestion, writeCourseQuestionAnswer };