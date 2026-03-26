import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCommentById, updateComment } from "../../managers/CommentsManager";

export const EditCommentForm = ({ token }) => {
  const { commentId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    id: commentId,
    postId: 0,
    authorId: 0,
    subject: "",
    content: "",
  });

  useEffect(() => {
    // TODO check if comment belongs to current user
    getCommentById(commentId).then((commentObj) => {
      if (commentObj.authorId !== parseInt(token)) {
        navigate(-1);
      }
    });
  }, []);

  useEffect(() => {
    getCommentById(commentId).then(setComment);
  }, []);

  const handleChange = (e) => {
    let copy = { ...comment };
    const id = e.target.id;
    copy[id] = e.target.value;
    setComment(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateComment(comment, commentId).then(() => {
      navigate(-1);
    });
  };

  return (
    <>
      <div className="container">
        <div className="section in-normal">
          <h1 className="title">Edit Comment</h1>
          <div className="form">
            <div className="block field">
              <label className="label">Subject</label>
              <input
                className="input"
                type="text"
                id="subject"
                value={comment.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="block field">
              <label className="label">Comment</label>
              <textarea
                className="textarea"
                rows="5"
                type="text"
                id="content"
                value={comment.content}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <button
                className="button is-link"
                label="Submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="button is-warning ml-3"
                label="Cancel"
                onClick={() => navigate(-1)}
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
