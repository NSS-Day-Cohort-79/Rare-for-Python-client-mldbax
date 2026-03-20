export const getPosts = () => {
  return fetch(`http://localhost:8088/posts`).then((res) => res.json());
};

export const getApprovedPosts = () => {
  return fetch(`http://localhost:8088/approved-posts`).then((res) => res.json());
};

export const getPostById = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`).then((res) => res.json());
};