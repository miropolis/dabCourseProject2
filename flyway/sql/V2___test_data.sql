INSERT INTO courses (title) VALUES ('Course 1: Learning the basics');
INSERT INTO courses (title) VALUES ('Course 2: Learning intermediate concepts');
INSERT INTO courses (title) VALUES ('Course 3: Acquiring expert knowledge');

INSERT INTO questions (course_id, title, question_content) VALUES (1, 'My first question', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'My second question', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'My third question', 'This is the content of the question from database');
INSERT INTO questions (course_id, title, question_content) VALUES (1, 'My fourth question', 'This is the content of the question from database');

INSERT INTO answers (question_id, title, answer_content) VALUES (1, 'My first answer', 'This is the content of the answer from database');
INSERT INTO answers (question_id, title, answer_content) VALUES (2, 'My second answer', 'This is the content of the answer from database');
INSERT INTO answers (question_id, title, answer_content) VALUES (3, 'My first answer', 'This is the content of the answer from database');
INSERT INTO answers (question_id, title, answer_content) VALUES (4, 'My second answer', 'This is the content of the answer from database');
