import { useEffect, useState } from "react";
import { createTag, getAllTags } from "../../managers/TagManager";
import { useNavigate } from "react-router-dom";

export const CreateTag = () => {
  const [label, setLabel] = useState("");
  const [allTags, setAllTags] = useState([]);
  const navigate = useNavigate();

  // get list of current tags
  useEffect(() => {
    getAllTags().then((tags) => {
      setAllTags(tags);
    });
  }, []);

  // check if user input already exists in tag list

  const handleTagCheck = (userInput) => {
    if (allTags.some((c) => c.label === userInput)) {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label.trim() === "") {
      alert("Please input a tag");
    } else if (handleTagCheck(label)) {
      alert("Tag already exists");
    } else {
      createTag({
        label: label,
      }).then(() => {
        navigate(-1);
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="section is-normal">
          <h1 className="title">Create New Tag</h1>
          <div className="field">
            <label className="label">Tag Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <button
              className="button is-link"
              label="Submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
