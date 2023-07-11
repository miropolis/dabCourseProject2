import { sql } from "../database/database.js";

const findUserPosted = async (user_uuid) => {
    return await sql`SELECT * FROM user_timetable WHERE user_uuid=${user_uuid};`
};

const writeUserPosted = async (user_uuid) => {
    return await sql`INSERT INTO user_timetable (user_uuid) VALUES (${user_uuid});`
};

const updateUserPosted = async (user_uuid) => {
    return await sql`UPDATE user_timetable SET posted = DEFAULT WHERE user_uuid=${user_uuid};`
};

const getDatabaseTime = async () => {
    return await sql`SELECT NOW();`
};

export { findUserPosted, writeUserPosted, updateUserPosted, getDatabaseTime };