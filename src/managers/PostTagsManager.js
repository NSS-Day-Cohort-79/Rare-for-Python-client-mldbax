export const createPostTag = (body) => {
  return fetch("http://localhost:8088/post-tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
