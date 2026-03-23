export const getCommentsByPostId = (post_id) => {
  return fetch(`http://localhost:8088/comments/${post_id}`).then((res) =>
    res.json(),
  );
};
