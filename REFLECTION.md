# Reflection on Course Project II of CS-E4770 Designing and Building Scalable Web Applications D at Aalto University

Here, I briefly describe my application and highlight key design decisions. I also consider possible improvements that could be undertaken to further improve my application. Reflection on the design of the database scheme can be found in DATABASE.md

It should be noted that my submission aims to satisfy the requirements for passing with merits. However, while I managed to fulfill all the other requirements, I did not manage to setup a working Kubernetes configuration. Hence, there are no instructions on running the Kubernetes cluster in the RUNNING.md. I hope the fact that my application fulfills all the requirements except for the Kubernetes cluster will still be considered in the grading.

## Frontend

The frontend uses Astro server-side rendering mode at its core to serve the pages of the various courses and questions on the Q&A platform. The course pages can be found at /course-1, /course-2, etc. The questions can be found at /questions/1, /questions/2, and so on.

It should be noted that the course pages are generated statically at the moment, but the questions pages are generated dynamically. When for example the page /questions/1 is opened, question 1 and the corresponding answers are loaded from the backend. 

Questions and answers also share the same upvote component, where each user can upvote a question or answer at most once and can also retract their upvote. In the following, I will go into detail on a few more features of the frontend.

### Infinite Scrolling

Inspiration for the infinite scrolling functionality I implemented was taken from https://svelte.dev/repl/4863a658f3584b81bbe3d9f54eb67899?version=3.32.3 . It utilizes the Intersection Observer API (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to determine when a user has scrolled to the bottom of the question or answer list. This functionality can be found in /qa-ui/src/services/useViewportAction.js

Initially, results to be retrieved from the database are limited to 20. When the bottom of a list is reached, a new request to the database with OFFSET 1 is sent to retrieve the next 20 questions, and so on.

To test infinite scrolling for questions, go to the page of course 1. To test infinite scrolling for answers, go to the page of question 1 (http://localhost:7800/questions/1).

### Question/Answer Submission Limit

The submission limit uses a separate database table which stores the time of the last submission for each user. Before a new question or answewr can be submitted this table is checked for entries younger than 1 minute. If any are found, an alert is shown to the user.

## Backend

The backend uses a Deno HTTP web server to answer to incoming HTTP requests from the frontend. In this case, I am using only POST requests. The backend also uses server-sent events to communicate to the clients whenever new questions or answers are published.

### Asynchronous LLM-generated answers

To asynchronously generate answers from the LLM, the web worker implementation of deno is utilized. The web worker (found in /qa-api/services/worker.js) maintains a queue of all submitted questions which still require auto generated answers and sends each of them to the llm-api and then writes the genreated answer to the database.

### Automatic update in client for new questions and answers

To update all clients on new questions and answers, I used server-sent events in the backend. Whenver a new question or answer is written to the database, this also triggers a server-sent event that updates the question or answer list of all clients. Hence, there is no need to reload to see the new questions and answers.

## Production configuration

### qa-ui

Because I am using server side rendering in Astro it would require an adapter (e.g., Deno) for a successful build. Since we did not go into this in the course I decided to leave it running in the development mode.

### qa-api

The web worker requires the --allow-read flag

## Possible Improvements

In the following, I briefly suggest a few possible improvements to incrase the performance of the application. In general, there are many different options to increase the performance and which one should be chosen depends on the exact requirements of the administrators and users.

### llm-api

To increase the performance of the LLM, multiple instances could be deployed and requests to the LLM could be distributed in a round-robin manner.

### qa-api

To increase the performance of the backend in general, also multiple instances could be deployed which would split the work of handling all the requests from the clients. 

### Database

The database could also be replicated multiple times to increase its availabilty and response times. PostgreSQL even has a built in replication system that could be utilized.

### Usability

Usability and UX could be improved by adding keydown event listeners (e.g., allowing to close the modal by pressing the escape key, putting the cursor in the text field on opening the modal, and so on)