import { useEffect, useState } from "react";
import { getCategories } from "../../managers/CategoryManager";

export const NewCategoryForm = () => {
  const [label, setLabel] = useState({
    label: "",
  });
  const [allCategories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const handleCategoryCheck = (userInput) => {
    if (allCategories.some((c) => c.label === userInput)) {
      return true;
    }
  };

  return (
    <>
      <div class="container">
        <div class="section is-normal">
          <h1 class="title">Create New Category</h1>
          <div class="field">
            <label class="label">Category Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Category" />
            </div>
          </div>
          <div class="field">
            <button class="button is-link" label="Submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
