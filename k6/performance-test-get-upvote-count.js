import http from "k6/http";
let i = 1;
// TODO test get upvote count
export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["med", "p(99)"],
};

export default function () {
  const url = "http://localhost:7800/api/post-answer";

  const payload = JSON.stringify({
    q_id: 1,
    a_title: "k6 example answer" + i,
    a_content: "k6 example answer content",
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