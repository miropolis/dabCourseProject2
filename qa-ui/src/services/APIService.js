// TODO put all api calls here with try error block and alternative display return

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
}

const getCourseQuestionAnswers = async (c_id, q_id) => {
    const data = { c_id: c_id, q_id: q_id };
    const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export { getCourseQuestions, getCourseQuestionAnswers };