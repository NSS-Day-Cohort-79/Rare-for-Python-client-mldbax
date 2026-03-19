import { useEffect, useState } from "react";
import { getCategories } from "../../managers/CategoryManager";

export const NewCategoryForm = () => {
  const [userInput, setUserInput] = useState({
    id: 0,
    label: "",
  });
  const [allCategories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

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
