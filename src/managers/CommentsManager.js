export const getCommentsByPostId = (postId) => {
  return fetch(`http://localhost:8088/post-comments/${postId}`).then((res) =>
    res.json(),
  );
};

export const createComment = (body) => {
  return fetch(`http://localhost:8088/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
