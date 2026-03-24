export const getCategories = () => {
  return fetch(`http://localhost:8088/categories`).then((res) => res.json());
};

export const deleteCategory = (id) => { 
  return fetch(`http://localhost:8088/categories/${id}`, {
    method: "DELETE",
  })
}

export const createCategory = (newCategory) => {
  return fetch(`http:localhost:8088/categories`, {
    method: "POSTS",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory)
  })
 }