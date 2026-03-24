import { useEffect, useState } from "react";
import { createCategory, getCategories } from "../../managers/CategoryManager";
import { useNavigate } from "react-router-dom";

export const NewCategoryForm = () => {
  const [label, setLabel] = useState("");
  const [allCategories, setCategories] = useState([]);
  const navigate = useNavigate()

  // get list of current categories
  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  // check if user input already exists in category list

  const handleCategoryCheck = (userInput) => {
    if (allCategories.some((c) => c.label === userInput)) {
      return true;
    }
  };

  // handleSaveCategory, call handle category check function, if false, api call, if true, return error
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (label.trim() === '') {
      alert('Please input a category')
    }
    else if (handleCategoryCheck(label)) {
      alert('Category already exists')
    }
    else {
      createCategory({ label: label }).then(() => {
        navigate(-1)
       })
     }
  }

  return (
    <>
      <div className="container">
        <div className="section is-normal">
          <h1 className="title">Create New Category</h1>
          <div className="field">
            <label className="label">Category Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Category"
                value={label}
                onChange={(e) => setLabel(e.target.value) } />
            </div>
          </div>
          <div className="field">
            {/* create onClick save category in button */}
            <button className="button is-link" label="Submit" onClick={handleSaveCategory}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
