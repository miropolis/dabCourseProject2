import { serve } from "./deps.js";
import * as questionService from "./services/questionService.js";

/*const handleRequest = async (request) => {
  const data = await request.json();

  const response = await fetch("http://llm-api:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};*/

// TODO Put all handlers in separate files

const handleGetQuestion = async (request) => {
  const searchParams = await request.json();
  const questions = await questionService.findQuestion(searchParams.q_id);
  return new Response(JSON.stringify(questions));
}

const handleGetCourseQuestions = async (request) => {
  const searchParams = await request.json();
  const questions = await questionService.findCourseQuestions(searchParams.c_id);
  return new Response(JSON.stringify(questions));
}

const handleGetCourseQuestionAnswers = async (request) => {
  const searchParams = await request.json();
  const answers = await questionService.findCourseQuestionAnswers(searchParams.q_id);
  return new Response(JSON.stringify(answers));
}

const handleSetCourseQuestion = async (request) => {
  const params = await request.json();
  const createdQuestion = await questionService.writeCourseQuestion(params.c_id, params.q_title, params.q_content);
  return new Response(JSON.stringify(createdQuestion));
}

const handleSetCourseQuestionAnswer = async (request) => {
  const params = await request.json();
  const createdQuestion = await questionService.writeCourseQuestionAnswer(params.q_id, params.a_title, params.a_content);
  return new Response(JSON.stringify(createdQuestion));
}

const urlMapping = [
  {
    method: "POST",
    pattern: new URLPattern({pathname: "/question"}),
    fn: handleGetQuestion,
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname: "/questions"}),
    fn: handleGetCourseQuestions,
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname: "/answers"}),
    fn: handleGetCourseQuestionAnswers,
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname: "/post-question"}),
    fn: handleSetCourseQuestion,
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname: "/post-answer"}),
    fn: handleSetCourseQuestionAnswer,
  },
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find((um) => um.method === request.method && um.pattern.test(request.url));
  console.log("Request to api/app.js with request url: " + request.url + " and request method: " + request.method);
  if (!mapping) return new Response("Not found", {status: 404});

  const mappingResult = mapping.pattern.exec(request.url);
  try {
      return await mapping.fn(request, mappingResult);
  } catch (e) {
      console.log(e);
      return new Response(e.stack, {status: 500})
  }
};


const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
