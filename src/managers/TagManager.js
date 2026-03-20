export const getAllTags = () =>
  fetch(`http://localhost:8088/tags`).then((res) => res.json());

export const createTag = (body) => {
  return fetch("http://localhost:8088/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}
