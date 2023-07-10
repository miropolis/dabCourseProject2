// TODO put all api calls here with TRY ERROR BLOCKS and alternative display return

const getQuestion = async (q_id) => {
    const data = { q_id: q_id };
    const response = await fetch("/api/question", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};

const getCourseQuestions = async (c_id) => {
    const data = { c_id: c_id };
    const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};

const setCourseQuestion = async (c_id, q_title, q_content) => {
    const data = { c_id: c_id, q_title: q_title, q_content: q_content }
    const response = await fetch("/api/post-question", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    //TODO unsuccessful return?
    return await response.json();
};

const setCourseQuestionAnswer = async (q_id, a_title, a_content) => {
    const data = { q_id: q_id, a_title: a_title, a_content: a_content }
    const response = await fetch("/api/post-answer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};

const getCourseQuestionAnswers = async (q_id) => {
    const data = { q_id: q_id };
    const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};

const getUpvoteCount = async (isQuestion, q_a_id) => {
    const data = { isQuestion: isQuestion, q_a_id: q_a_id };
    const response = await fetch("/api/upvote-count", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};

const getHasUserUpvoted = async (isQuestion, q_a_id, user_uuid) => {
    const data = { isQuestion: isQuestion, q_a_id: q_a_id, user_uuid: user_uuid };
    const response = await fetch("/api/user-upvoted", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};

const setUpvoteChange = async (isQuestion, isUpvoted, q_a_id, user_uuid) => {
    const data = { isQuestion: isQuestion, isUpvoted: isUpvoted, q_a_id: q_a_id, user_uuid: user_uuid };
    const response = await fetch("/api/set-user-upvote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};

export { getQuestion, getCourseQuestions, getCourseQuestionAnswers, getUpvoteCount, setCourseQuestion, setCourseQuestionAnswer, getHasUserUpvoted, setUpvoteChange };