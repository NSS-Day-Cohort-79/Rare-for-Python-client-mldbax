export const getAllTags = () =>
  fetch(`http://localhost:8088/tags`).then((res) => res.json());

export const getTagById = (id) => {
  return fetch(`http://localhost:8088/tags/${id}`).then((res) => res.json())
 }

export const createTag = (body) => {
  return fetch("http://localhost:8088/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export const deleteTag = (id) => { 
  return fetch(`http://localhost:8088/tags/${id}`, {
    method: "DELETE",
  })
}

export const updateTag = (id, editedTag) => {
  return fetch(`http://localhost:8088/tags/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedTag)
  })
 }