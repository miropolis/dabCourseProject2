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
    question_id INTEGER REFERENCES questions(id),
    title TEXT NOT NULL,
    answer_content TEXT NOT NULL,
    posted TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE question_upvotes (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id),
    user_uuid TEXT NOT NULL
);

CREATE TABLE answer_upvotes (
    id SERIAL PRIMARY KEY,
    answer_id INTEGER REFERENCES answers(id),
    user_uuid TEXT NOT NULL
);

CREATE TABLE user_timetable (
    id SERIAL PRIMARY KEY,
    user_uuid TEXT NOT NULL,
    posted TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

/* TODO Create meaningful indexes */