// Fetch all posts from the database
export const getPosts = () => {
  return fetch(`http://localhost:8088/posts`).then((res) => res.json());
};

// Fetch all approved/published posts from the database
export const getApprovedPosts = () => {
  return fetch(`http://localhost:8088/approved-posts`).then((res) =>
    res.json(),
  );
};


// Create a new post
export const createPost = (body) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

// Fetch a single post by its ID
export const getPostById = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`).then((res) =>
    res.json(),
  );
};
// Fetch all posts authored by a specific user
export const getUserPosts = (userId) => {
  return fetch(`http://localhost:8088/user-posts/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      if (typeof data === 'string') {
        return JSON.parse(data);
      }
      return data;
    });
};

// Delete a post by its ID
export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const updatePost = (body) => {
  return fetch(`http://localhost:8088/posts/${body.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
