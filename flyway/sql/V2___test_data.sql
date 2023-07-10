INSERT INTO courses (title) VALUES ('Course 1: Learning the basics');
INSERT INTO courses (title) VALUES ('Course 2: Learning intermediate concepts');
INSERT INTO courses (title) VALUES ('Course 3: Acquiring expert knowledge');

INSERT INTO questions (course_id, title, question_content) VALUES (1, 'My first question', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'My second question', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'My third question', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'My fourth question', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q5', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q6', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q7', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q8', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q9', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q10', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q11', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q12', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q13', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q14', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q15', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q16', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q17', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q18', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q19', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q20', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q21', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q22', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'Q23', 'This is the content of the question from database');

INSERT INTO answers (question_id, title, answer_content) VALUES (1, 'My first answer', 'This is the content of the answer from database');
INSERT INTO answers (question_id, title, answer_content) VALUES (2, 'My second answer', 'This is the content of the answer from database');
INSERT INTO answers (question_id, title, answer_content) VALUES (3, 'My first answer', 'This is the content of the answer from database');
INSERT INTO answers (question_id, title, answer_content) VALUES (4, 'My second answer', 'This is the content of the answer from database');


INSERT INTO question_upvotes (question_id, user_uuid) VALUES (1, 'database-user-1');
INSERT INTO question_upvotes (question_id, user_uuid) VALUES (1, 'database-user-2');
INSERT INTO question_upvotes (question_id, user_uuid) VALUES (1, 'database-user-3');

INSERT INTO question_upvotes (question_id, user_uuid) VALUES (2, 'database-user-1');
INSERT INTO question_upvotes (question_id, user_uuid) VALUES (2, 'database-user-2');

INSERT INTO question_upvotes (question_id, user_uuid) VALUES (3, 'database-user-1');

INSERT INTO answer_upvotes (answer_id, user_uuid) VALUES (1, 'database-user-1');
INSERT INTO answer_upvotes (answer_id, user_uuid) VALUES (2, 'database-user-1');
INSERT INTO answer_upvotes (answer_id, user_uuid) VALUES (3, 'database-user-1');