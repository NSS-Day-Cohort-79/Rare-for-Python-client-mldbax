export const getCommentsByPostId = (postId) => {
  return fetch(`http://localhost:8088/post-comments/${postId}`).then((res) =>
    res.json(),
  );
};
