let llmQueue = [];

self.onmessage = async (e) => {
    const { q_id, q_title } = e.data;
    console.log(q_id, " - ", q_title);
    llmQueue.push([q_id, q_title]);
  };

while (true) {
    if (llmQueue.length > 0) {
        const queueContent = llmQueue.shift();
        const data = {
            question: queueContent[1],
          };
        const response = await fetch("http://llm-api:7000/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const jsonData = await response.json();
        postMessage({ q_id: queueContent[0], a_content: jsonData[0].generated_text });
    };
    await new Promise(r => setTimeout(r, 1000));
};