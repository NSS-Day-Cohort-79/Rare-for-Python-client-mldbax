import { useEffect, useState } from "react";
import { getCategories } from "../../managers/CategoryManager";

export const CategoryList = () => {
  const [categoryArray, setCategoryArray] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategoryArray(categories);
    });
  }, []);

  return (
    <>
      <div class="content is-normal">
        <h1>Categories</h1>
        {categoryArray.map((category) => {
          return (
            <div class="tags has-addons are-medium" key={category.id}>
              <a class="tag is-primary is-hoverable" href="/">{category.label}</a>
              <a class="tag is-light" href="/">&#9881;</a>
              <a class="tag is-delete" href="/"> </a>
            </div>
          );
        })}
      </div>
    </>
  );
};
