import { sql } from "../database/database.js";

const findQuestionUpvoteCount = async (q_id) => {
    return await sql`SELECT COUNT(question_id) FROM question_upvotes WHERE question_id = ${q_id};`
};

const findAnswerUpvoteCount = async (a_id) => {
    return await sql`SELECT COUNT(answer_id) FROM answer_upvotes WHERE answer_id = ${a_id};`
};
  
const findQuestionUserUpvoted = async (q_id, user_uuid) => {
    return await sql`SELECT * FROM question_upvotes WHERE question_id = ${q_id} AND user_uuid = ${user_uuid};`
};

const findAnswerUserUpvoted = async (a_id, user_uuid) => {
    return await sql`SELECT * FROM answer_upvotes WHERE answer_id = ${a_id} AND user_uuid = ${user_uuid};`
};

const writeQuestionUpvote = async (q_id, user_uuid) => {
    return await sql`INSERT INTO question_upvotes (question_id, user_uuid) VALUES (${q_id}, ${user_uuid});`
};

const writeAnswerUpvote = async (a_id, user_uuid) => {
return await sql`INSERT INTO answer_upvotes (answer_id, user_uuid) VALUES (${a_id}, ${user_uuid});`
};

const deleteQuestionUpvote = async (q_id, user_uuid) => {
    return await sql`DELETE FROM question_upvotes WHERE question_id = ${q_id} AND user_uuid = ${user_uuid};`
};

const deleteAnswerUpvote = async (a_id, user_uuid) => {
    return await sql`DELETE FROM answer_upvotes WHERE answer_id = ${a_id} AND user_uuid = ${user_uuid};`
};
  
export { findQuestionUpvoteCount, findAnswerUpvoteCount, findQuestionUserUpvoted, findAnswerUserUpvoted, writeQuestionUpvote, writeAnswerUpvote, deleteQuestionUpvote, deleteAnswerUpvote };