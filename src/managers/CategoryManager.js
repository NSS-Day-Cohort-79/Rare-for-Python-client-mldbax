export const getCategories = () => {
  return fetch(`http://localhost:8088/categories`).then((res) => res.json());
};

export const getCategoryById = (id) => {
  return fetch(`http://localhost:8088/categories/${id}`).then((res) => res.json())
 }

export const deleteCategory = (id) => { 
  return fetch(`http://localhost:8088/categories/${id}`, {
    method: "DELETE",
  })
}

export const createCategory = (label) => {
  return fetch(`http://localhost:8088/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(label)
  })
}
 
export const updateCategory = (id, editedCategory) => {
  return fetch(`http://localhost:8088/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedCategory)
  })
 }
