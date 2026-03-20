import { useEffect, useState } from "react";
import { getCategories } from "../../managers/CategoryManager";

export const NewCategoryForm = () => {
  const [label, setLabel] = useState({
    label: "",
  });
  const [allCategories, setCategories] = useState([]);

  // get list of current categories
  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  // check if user input already exists in category list

  //   const handleCategoryCheck = (userInput) => {
  //     if (allCategories.some((c) => c.label === userInput)) {
  //       return true;
  //     }
  //   };

  // handleSaveCategory, call handle category check function, if false, api call, if true, return error

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
            {/* create onClick save category in button */}
            <button class="button is-link" label="Submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
