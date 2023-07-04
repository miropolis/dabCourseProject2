import { sql } from "../database/database.js";

const findCourseQuestions = async (c_id) => {
  return await sql`SELECT * FROM questions WHERE course_id = ${c_id};`;
};

const findCourseQuestionAnswers = async (c_id, q_id) => {
  return await sql`SELECT * FROM answers WHERE course_id = ${c_id} AND question_id = ${q_id};`;
};

const writeCourseQuestion = async (c_id, q_title, q_content) => {
  return await sql`INSERT INTO questions (course_id, title, question_content) VALUES (${c_id}, ${q_title}, ${q_content});`
};

export { findCourseQuestions, findCourseQuestionAnswers, writeCourseQuestion };