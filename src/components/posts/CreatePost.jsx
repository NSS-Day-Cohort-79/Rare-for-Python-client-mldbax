import { useEffect, useState } from "react";
import { getCategories } from "../../managers/CategoryManager";
import { createPost } from "../../managers/PostsManager";
import { useNavigate } from "react-router-dom";

export const CreatePost = ({ token }) => {
  const [newPost, setNewPost] = useState({
    title: null,
    categoryId: 0,
    imageUrl: "",
  });
  const [allCategories, setAllCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(setAllCategories);
  }, []);

  const handleChange = (e) => {
    let copy = { ...newPost };
    const id = e.target.id;
    if (id === "categoryId") {
      copy[id] = parseInt(e.target.value);
    } else {
      copy[id] = e.target.value;
    }
    setNewPost(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.categoryId > 0) {
      let copy = { ...newPost, userId: parseInt(token) };
      createPost(copy).then((res) => navigate(`/posts/${res.id}`));
    } else {
      alert("Please pick a category");
    }
  };

  return (
    <>
      <div className="container">
        <div className="section is-normal">
          <h1 className="title">New Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Title"
                  id="title"
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
                    defaultValue={0}
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
