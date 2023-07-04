CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    title TEXT NOT NULL,
    question_content TEXT NOT NULL,
    posted TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    question_id INTEGER REFERENCES questions(id),
    title TEXT NOT NULL,
    answer_content TEXT NOT NULL,
    posted TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

/* TODO Add user uuid to questions and answer relations */

/* TODO Create upvote relations */

/* TODO Create meaningful indexes */