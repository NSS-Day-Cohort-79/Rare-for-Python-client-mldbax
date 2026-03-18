export const getAllTags = () =>
  fetch(`http://localhost:8088/tags`).then((res) => res.json());
