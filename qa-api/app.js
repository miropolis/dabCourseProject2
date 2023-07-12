import { serve, connect } from "./deps.js";
import * as questionService from "./services/questionService.js";
import * as upvoteService from "./services/upvoteService.js";
import * as userService from "./services/userService.js";
import { getUserPostedRecently } from "./utils/userPostedRecentlyGetter.js";

// TODO Put all handlers in separate files
const worker = new Worker(new URL("./services/worker.js", import.meta.url).href, { type: "module" });
worker.onmessage = async (e) => {
  const { q_id, a_content } = e.data;
  await questionService.writeCourseQuestionAnswer(q_id, "Auto Generated Answer", a_content);
  sendUpdate("AnswerAdded");
};

// start of SSE
const encoder = new TextEncoder();
let controllers = new Set();;
/*setInterval(() => {
    const msg = encoder.encode(`data: abc\n\n`);
    controllers.forEach((controller) => controller.enqueue(msg));
}, 1000);*/

const sendUpdate = async (message) => {
  const msg = encoder.encode(`data: ${message}\n\n`);
  controllers.forEach((controller) => controller.enqueue(msg));
};

const handleQAUpdates = async (request) => {
  let controller;
  
  const body = new ReadableStream({
    start(c) {
      controller = c;
      controllers.add(controller);
    },
    cancel() {
      controllers.delete(controller);
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Access-Control-Allow-Origin": "*",
      "Connection": "keep-alive",
    },
  });
};
// End of SSE


const handleGetQuestion = async (request) => {
  const searchParams = await request.json();
  const questions = await questionService.findQuestion(searchParams.q_id);
  return new Response(JSON.stringify(questions));
}

const handleGetCourseQuestions = async (request) => {
  let questions;
  const searchParams = await request.json();
  if (searchParams.offset_number === 0) {
    questions = await questionService.findCourseQuestions(searchParams.c_id);
  } else {
    questions = await questionService.findMoreCourseQuestions(searchParams.c_id, searchParams.offset_number);
  };
  return new Response(JSON.stringify(questions));
}

const handleGetCourseQuestionAnswers = async (request) => {
  let answers;
  const searchParams = await request.json();
  if (searchParams.offset_number === 0) {
    answers = await questionService.findCourseQuestionAnswers(searchParams.q_id);
  } else {
    answers = await questionService.findMoreCourseQuestionAnswers(searchParams.q_id, searchParams.offset_number);
  };
  return new Response(JSON.stringify(answers));
}

const handleSetCourseQuestion = async (request) => {
  const params = await request.json();

  // Check if user posted recently (less than 60 seconds)
  const responseData = await getUserPostedRecently(params.user_uuid);
  if (responseData.questionAdded === false) {
    return new Response(JSON.stringify(responseData));
  };

  const createdQuestion = await questionService.writeCourseQuestion(params.c_id, params.q_title, params.q_content);
  worker.postMessage({ q_id: createdQuestion[0].id, q_title: params.q_title });
  worker.postMessage({ q_id: createdQuestion[0].id, q_title: params.q_title });
  worker.postMessage({ q_id: createdQuestion[0].id, q_title: params.q_title });
  sendUpdate("QuestionAdded");
  return new Response(JSON.stringify(responseData));
}

const handleSetCourseQuestionAnswer = async (request) => {
  const params = await request.json();

  const responseData = await getUserPostedRecently(params.user_uuid);
  if (responseData.questionAdded === false) {
    return new Response(JSON.stringify(responseData));
  };
  const createdAnswer = await questionService.writeCourseQuestionAnswer(params.q_id, params.a_title, params.a_content);
  sendUpdate("AnswerAdded");
  return new Response(JSON.stringify(responseData));
}

const handleGetUpvoteCount = async (request) => {
  const params = await request.json();
  let upvoteCount;
  if (params.isQuestion) {
    upvoteCount = await upvoteService.findQuestionUpvoteCount(params.q_a_id);
  } else {
    upvoteCount = await upvoteService.findAnswerUpvoteCount(params.q_a_id);
  };
  return new Response(JSON.stringify(upvoteCount));
}

const handleGetUserUpvoted = async (request) => {
  const params = await request.json();
  let userUpvoted;
  if (params.isQuestion) {
    userUpvoted = await upvoteService.findQuestionUserUpvoted(params.q_a_id, params.user_uuid);
  } else {
    userUpvoted = await upvoteService.findAnswerUserUpvoted(params.q_a_id, params.user_uuid);
  };
  return new Response(JSON.stringify(userUpvoted));
}

const handleSetUpvoteChange = async (request) => {
  const params = await request.json();
  if (params.isQuestion) {
    await questionService.writeQuestionUpdate(params.q_a_id);
    if (params.isUpvoted) {
      // isUpvoted is true -> delete upvote record
      await upvoteService.deleteQuestionUpvote(params.q_a_id, params.user_uuid);
    } else {
      // isUpvoted is false -> add upvote record
      await upvoteService.writeQuestionUpvote(params.q_a_id, params.user_uuid);
    };
  } else {
    await questionService.writeAnswerUpdate(params.q_a_id);
    if (params.isUpvoted) {
      await upvoteService.deleteAnswerUpvote(params.q_a_id, params.user_uuid);
    } else {
      await upvoteService.writeAnswerUpvote(params.q_a_id, params.user_uuid);
    };
  };
  const data = {
    feedback: "Upvote changed successfully!",
  };
  return Response.json(data);
};

const handleLLM = async (request) => {
  const data = await request.json();

  const response = await fetch("http://llm-api:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

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
  {
    method: "POST",
    pattern: new URLPattern({pathname: "/upvote-count"}),
    fn: handleGetUpvoteCount,
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname: "/user-upvoted"}),
    fn: handleGetUserUpvoted,
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname: "/set-user-upvote"}),
    fn: handleSetUpvoteChange,
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname: "/llm"}),
    fn: handleLLM,
  },
  {
    method: "GET",
    pattern: new URLPattern({pathname: "/q-a-updates"}),
    fn: handleQAUpdates,
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
