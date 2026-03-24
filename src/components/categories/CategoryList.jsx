import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../../managers/CategoryManager";
import { Link } from "react-router-dom";

export const CategoryList = () => {
  const [categoryArray, setCategoryArray] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategoryArray(categories);
    });
  }, []);

  // handle delete passing category id add alert to make sure admin wants to delete it
  const handleDelete = (id) => {
    const yesDelete = window.confirm("Are you sure you want to delete this category?");
    if (yesDelete) {
      deleteCategory(id).then(() => {
        getCategories().then((categories) => {
          setCategoryArray(categories)
        })
      })
    }
  }

  return (
    <>
      <div className="container">
          {/* add link for Create New Category, route to /new */}
           <nav className="level">
            <div className="level-left"></div>
            <div className="level-right">
              <p className="level-item"></p>
              <a className="button is-success" href="categories/new">Create Category</a>
            </div>
            </nav>
        <div className="section is-normal">
          <h1 className="title">Categories</h1>
          {categoryArray.map((category) => {
            return (
              <div className="tags has-addons are-medium" key={category.id}>
                <a className="tag is-info is-hoverable" href="/">
                  {category.label}
                </a>
                <a className="tag is-light" href="/">
                  &#9881;
                </a>
                <a className="tag is-delete" href="/" onClick={(e) => {
                  e.preventDefault()
                  handleDelete(category.id)
                }}>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
