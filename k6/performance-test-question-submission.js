import http from "k6/http";
let i = 1;

export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["med", "p(99)"],
};

export default function () {
  const url = "http://localhost:7800/api/post-question";

  const payload = JSON.stringify({
    c_id: 1,
    q_title: "k6 example" + i,
    q_content: "k6 example question content",
    user_uuid: "k6-test-user",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
  i++;
}