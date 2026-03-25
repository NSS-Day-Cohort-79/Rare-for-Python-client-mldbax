import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const NewCommentForm = ({ token }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    postId: parseInt(postId),
    authorId: parseInt(token),
    subject: "",
    content: "",
  });

  const handleChange = (e) => {
    const copy = { ...comment };
    const id = e.target.id;
    copy[id] = e.target.value;
    setComment(copy);
  };
  const handleSubmit = () => {};

  return (
    <>
      <div className="container">
        <div className="section is-normal">
          <h1 className="title">New Comment</h1>
          <div className="form">
            <div className="block field">
              <label className="label">Subject</label>
              <input
                className="input"
                type="text"
                id="subject"
                required
                onChange={handleChange}
              />
            </div>
            <div className="block field">
              <label className="label">Comment</label>
              <input
                className="input"
                type="text"
                id="content"
                required
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <button
                className="button is-link"
                label="Submit"
                // onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <div className="field">
              <button
                className="button is-warning"
                label="Cancel"
                // onClick={navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
