import { useState } from "react";
import { createTag } from "../../managers/TagManager";
import { useNavigate } from "react-router-dom";

export const CreateTag = () => {
  const [label, setLabel] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label.trim() === '') {
      alert('Please input a tag')
    }
      else {
      createTag({
        label: label,
      }).then(() => { navigate(-1) });
    }
  };

  return (
    <>
      Create Tag
      <input
        className="input"
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <button className="button" onClick={handleSubmit}>
        create
      </button>
    </>
  );
};
