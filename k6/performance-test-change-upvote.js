import http from "k6/http";
let isUpvoted = false;

export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["med", "p(99)"],
};

export default function () {
  const url = "http://localhost:7800/api/set-user-upvote";

  const payload = JSON.stringify({
    q_a_id: 1,
    user_uuid: "k6-test-user",
    isQuestion: true,
    isUpvoted: isUpvoted,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (isUpvoted) {
    isUpvoted = false;
  } else {
    isUpvoted = true;
  };
  http.post(url, payload, params);
}