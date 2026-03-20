import { useEffect, useState } from "react";
import { getCategories } from "../../managers/CategoryManager";
import { Link } from "react-router-dom";

export const CategoryList = () => {
  const [categoryArray, setCategoryArray] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategoryArray(categories);
    });
  }, []);

  return (
    <>
      <div class="container">
        <div class="section is-normal">
          <h1 class="title">Categories</h1>
          {/* add link for Create New Category, route to /new */}
          <Link>Create New Category</Link>
          {categoryArray.map((category) => {
            return (
              <div class="tags has-addons are-medium" key={category.id}>
                <a class="tag is-primary is-hoverable" href="/">
                  {category.label}
                </a>
                <a class="tag is-light" href="/">
                  &#9881;
                </a>
                <a class="tag is-delete" href="/">
                  {" "}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
