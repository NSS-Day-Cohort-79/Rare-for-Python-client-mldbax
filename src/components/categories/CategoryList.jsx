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
      <div>
        {categoryArray.map((category) => {
          return (
            <div key={category.id}>
              <div>{category.label}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
