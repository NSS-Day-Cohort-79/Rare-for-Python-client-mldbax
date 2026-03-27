export const createPostTag = (body) => {
  return fetch("http://localhost:8088/post-tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const deletePostTag = (id) => {
  return fetch(`http://localhost:8088/post-tags/${id}`, {
    method: "DELETE",
  });
};
