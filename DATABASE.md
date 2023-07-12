# Database design

## Database schema

The database schema has three components which are explained in the following.

### Courses, questions and answers - The content

The main content of the question and answer platform is essentially represented by three objects, which each have their own table in the database. First, there are courses which are stored in the 'courses' table. Each course has an 'id' and a 'title'. Although in the application the courses are not retrieved dynamically, they still need an ID that can be referenced from the questions.

For each course, questions can be posted. These are stored in the 'questions' table. Each question has the primary key 'id', a 'course_id' (the foreign key), a 'title', 'question_content' and a 'posted' date. The date is required to determine the ordering of the questions based on recency.

For each question, answers can be given. These are stored in the 'answers' table. Each answer has the primary key 'id', the foreign key 'question_id', a 'title', 'answer_content' and a 'posted' date. Analogous the 'questions' table, the 'posted' date is required for the sorting of the answers.

### Upvotes

To store the number of upvotes for each question and answer, there are two separate tables 'question_upvotes' and 'answer_upvotes'. Each of these tables has the primary key 'id', the foreign key 'question_id'/'answer_id' and the 'user_uuid'. The foreign key references the question or answer which the upvote was given for. The user_uuid has to be stored to keep track of which questions/answers one user has upvoted.

### User timetable - Cooldown betewen question/answer submissions

To ensure that no single user can post more than one question or answer per minute, the time and date of their last question or answer submission must be kept track off. This is done through the 'user_timetable' table. It has the primary key 'id', a 'user_uuid', and a 'posted' date. Whenever a user tries to submit a question or an answer, this table can be checked to make sure their last submission was more than one minute ago. Whenever a user successfully submits a question or an answer, the table is updated with the date and time of this most recent submission.

## Indices

For each of the tables question_upvotes, answer_upvotes and user_timetable queries that select entries by a specific user_uuid are common. Hence, these tables are indexed based on their user_uuid column to speed up these queries from the upvoteService.js and userService.js of the qa-api.

The other tables are almost only queried based on their primary keys (usually 'id'), which is indexed by default. Finally, the database schema does not contain any other complex relations that would require specific indices.