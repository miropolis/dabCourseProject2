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

export { getCourseQuestions };