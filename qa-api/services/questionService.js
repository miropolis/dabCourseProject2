import { sql } from "../database/database.js";

const findCourseQuestions = async (c_id) => {
  return await sql`SELECT * FROM questions WHERE course_id = ${c_id};`;
};

export { findCourseQuestions };