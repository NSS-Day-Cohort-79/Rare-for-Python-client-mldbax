import { useEffect, useState } from "react";
import { getCategories } from "../../managers/CategoryManager";
import { createPost, getPostById } from "../../managers/PostsManager";
import { useNavigate, useParams } from "react-router-dom";

export const EditPost = ({ token }) => {
  const [postInfo, setPostInfo] = useState({
    title: "",
    category: {},
    categoryId: 0,
    imageUrl: "",
    content: "",
  });
  const [allCategories, setAllCategories] = useState([]);

  const navigate = useNavigate();

  const { postId } = useParams();

  useEffect(() => {
    // TODO check if post belongs to current user?
    getPostById(postId).then((postObj) => {
      if (postObj.userId === parseInt(token)) {
        delete postObj.category;
        delete postObj.user;
        setPostInfo(postObj);
      } else {
        navigate(-1);
      }
    });
  }, [postId]);

  useEffect(() => {
    getCategories().then(setAllCategories);
  }, []);

  const handleChange = (e) => {
    let copy = { ...postInfo };
    const id = e.target.id;
    if (id === "categoryId") {
      copy[id] = parseInt(e.target.value);
    } else {
      copy[id] = e.target.value;
    }
    setPostInfo(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postInfo.categoryId > 0) {
      let copy = { ...postInfo, userId: parseInt(token) };
      createPost(copy).then((res) => navigate(`/posts/${res.id}`));
    } else {
      alert("Please pick a category");
    }
  };

  return (
    <>
      <div className="container">
        <div className="section is-normal">
          <h1 className="title">Edit Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Title"
                  id="title"
                  value={postInfo.title}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Image Url</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="image url"
                  id="imageUrl"
                  value={postInfo.imageUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Post Content</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder=""
                  id="content"
                  rows="10"
                  value={postInfo.content}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select
                    id="categoryId"
                    onChange={handleChange}
                    value={postInfo.categoryId}
                    required
                  >
                    <option hidden value={0}>
                      Select Category
                    </option>
                    {allCategories.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <button className="button is-link" label="Submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
