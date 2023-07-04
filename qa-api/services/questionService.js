import { sql } from "../database/database.js";

const findQuestion = async (q_id) => {
  return await sql`SELECT * FROM questions WHERE id = ${q_id};`;
};

const findCourseQuestions = async (c_id) => {
  return await sql`SELECT * FROM questions WHERE course_id = ${c_id} ORDER BY posted DESC;`;
};

const findCourseQuestionAnswers = async (q_id) => {
  return await sql`SELECT * FROM answers WHERE question_id = ${q_id} ORDER BY posted DESC;`;
};

const writeCourseQuestion = async (c_id, q_title, q_content) => {
  return await sql`INSERT INTO questions (course_id, title, question_content) VALUES (${c_id}, ${q_title}, ${q_content});`
};

const writeCourseQuestionAnswer = async (q_id, q_title, q_content) => {
  return await sql`INSERT INTO answers (question_id, title, answer_content) VALUES (${q_id}, ${q_title}, ${q_content});`
};

export { findQuestion, findCourseQuestions, findCourseQuestionAnswers, writeCourseQuestion, writeCourseQuestionAnswer };