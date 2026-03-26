import { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "../../managers/CategoryManager";
import { useNavigate, useParams } from "react-router-dom";

export const EditCategory = () => {
  const [editedCategory, setEditedCategory] = useState({}) 
  const { id } = useParams()
  const navigate = useNavigate()

 //fetch category data and populate editedCategory
  useEffect(() => {
    getCategoryById(id).then((catObj) => {
      setEditedCategory(catObj)
     })
  }, [id])
  
  //handle input change
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const copy = { ...editedCategory };
    if (type === "text") {
      copy[name] = value
    }
    setEditedCategory(copy)
   }

  //handle updated category and navigate back to category list
  const handleUpdateCategory = () => {
    updateCategory(id, editedCategory).then(() => {
      navigate(`/categories`)
     })
   } 

  return (
    <>
      <div className="container">
        <div className="section is-normal">
          <h1 className="title">Edit Category</h1>
          <div className="field">
            <label className="label">Category Name</label>
            <div className="control">
              <input
                name="label"
                type="text"
                value={editedCategory?.label || ""}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          </div>
          <div className="field">
            {/* create onClick save category in button */}
            <button
              className="button is-link"
              label="Submit"
              onClick={() => {
                handleUpdateCategory();
               }}
            >
              Submit
            </button>
            <button
              className="button is-warning ml-3"
              label="Cancel"
              onClick={() => {
                navigate(-1);
               }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
