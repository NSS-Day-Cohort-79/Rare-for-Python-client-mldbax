import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTagById, updateTag } from "../../managers/TagManager";

export const EditTag = () => {
  const [editedTag, setEditedTag] = useState({}) 
  const { id } = useParams()
  const navigate = useNavigate()

 //fetch category data and populate editedCategory
  useEffect(() => {
    getTagById(id).then((tagObj) => {
      setEditedTag(tagObj)
     })
  }, [id])
  
  //handle input change
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const copy = { ...editedTag };
    if (type === "text") {
      copy[name] = value
    }
    setEditedTag(copy)
   }

  //handle updated category and navigate back to category list
  const handleUpdateTag = () => {
    updateTag(id, editedTag).then(() => {
      navigate(`/tags`)
     })
   } 

  return (
    <>
      <div className="container">
        <div className="section is-normal">
          <h1 className="title">Edit Tag</h1>
          <div className="field">
            <label className="label">Tag Name</label>
            <div className="control">
              <input
                name="label"
                type="text"
                value={editedTag?.label || ""}
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
                handleUpdateTag();
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
