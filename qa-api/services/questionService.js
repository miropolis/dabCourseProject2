import { sql } from "../database/database.js";

const findQuestion = async (q_id) => {
  return await sql`SELECT * FROM questions WHERE id = ${q_id};`;
};

const findCourseQuestions = async (c_id) => {
  return await sql`SELECT * FROM questions WHERE course_id = ${c_id} ORDER BY posted DESC LIMIT 20;`;
};

const findMoreCourseQuestions = async (c_id, offset_number) => {
  c_id = Number.parseInt(c_id)
  offset_number = offset_number * 20;
  return await sql`SELECT * FROM questions WHERE course_id = ${c_id} ORDER BY posted DESC LIMIT 20 OFFSET ${offset_number};`;
};

const findCourseQuestionAnswers = async (q_id) => {
  return await sql`SELECT * FROM answers WHERE question_id = ${q_id} ORDER BY posted DESC LIMIT 20;`;
};

const findMoreCourseQuestionAnswers = async (q_id, offset_number) => {
  q_id = Number.parseInt(q_id)
  offset_number = offset_number * 20;
  return await sql`SELECT * FROM answers WHERE question_id = ${q_id} ORDER BY posted DESC LIMIT 20 OFFSET ${offset_number};`;
};

const writeCourseQuestion = async (c_id, q_title, q_content) => {
  return await sql`INSERT INTO questions (course_id, title, question_content) VALUES (${c_id}, ${q_title}, ${q_content}) RETURNING id;`
};

const writeCourseQuestionAnswer = async (q_id, a_title, a_content) => {
  return await sql`INSERT INTO answers (question_id, title, answer_content) VALUES (${q_id}, ${a_title}, ${a_content});`
};

const writeQuestionUpdate = async (q_id) => {
  return await sql`UPDATE questions SET posted = DEFAULT WHERE id = ${q_id}`
};

const writeAnswerUpdate = async (a_id) => {
  return await sql`UPDATE answers SET posted = DEFAULT WHERE id = ${a_id}`
};

export { findQuestion, findCourseQuestions, findMoreCourseQuestions, findCourseQuestionAnswers, findMoreCourseQuestionAnswers, writeCourseQuestion, writeCourseQuestionAnswer, writeQuestionUpdate, writeAnswerUpdate };