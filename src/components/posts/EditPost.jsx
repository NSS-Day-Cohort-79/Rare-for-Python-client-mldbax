import { useEffect, useState } from "react";
import { getCategories } from "../../managers/CategoryManager";
import {
  createPost,
  getPostById,
  updatePost,
} from "../../managers/PostsManager";
import { useNavigate, useParams } from "react-router-dom";
import { getAllTags } from "../../managers/TagManager";
import { createPostTag } from "../../managers/PostTagsManager";

export const EditPost = ({ token }) => {
  const [postInfo, setPostInfo] = useState({
    title: "",
    category: {},
    categoryId: 0,
    imageUrl: "",
    content: "",
  });
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [newTags, setNewTags] = useState([]);

  const navigate = useNavigate();

  const { postId } = useParams();

  useEffect(() => {
    getPostById(postId).then((postObj) => {
      if (postObj.userId === parseInt(token)) {
        delete postObj.category;
        delete postObj.user;
        setPostInfo(postObj);
        let currentTags = [];
        postObj.tags.forEach((postTag) => {
          currentTags.push(postTag.tag);
        });
        setNewTags(currentTags);
      } else {
        navigate(-1);
      }
    });
  }, [postId]);

  useEffect(() => {
    getCategories().then(setAllCategories);
    getAllTags().then(setAllTags);
  }, []);

  useEffect(() => {
    updateTags();
  }, [allTags, newTags]);

  const updateTags = () => {
    const filteredTags = allTags.filter(
      (tag) => !newTags.some((newTag) => newTag.id === tag.id),
    );
    setAvailableTags(filteredTags);
  };

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

  const addTag = (e) => {
    let copy = structuredClone(newTags);
    const tagObj = availableTags.find(
      (tag) => tag.id === parseInt(e.target.value),
    );
    copy.push(tagObj);
    setNewTags(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost(postInfo).then(() => {
      // get tags to Add
      let newPostTags = [];
      for (const newTag of newTags) {
        if (!postInfo.tags.some((postTag) => postTag.tagId === newTag.id)) {
          newPostTags.push({ postId: parseInt(postId), tagId: newTag.id });
        }
      }
      Promise.all(newPostTags.map((postTag) => createPostTag(postTag))).then(
        () => {
          navigate(-1);
        },
      );
    });
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
              <label className="label">Tags</label>
              <div className="tags">
                {newTags.map((tag) => {
                  return (
                    <div className="tag is-info" key={tag.id}>
                      {tag.label}
                    </div>
                  );
                })}
              </div>
              <div className="control">
                <div className="select">
                  <select id="TagId" onChange={addTag} value={0} required>
                    <option hidden value={0}>
                      Add Tag
                    </option>
                    {availableTags.map((tag) => {
                      return (
                        <option key={tag.id} value={tag.id}>
                          {tag.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="buttons">
              <div className="field">
                <button className="button is-link" label="Submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <button
            className="button is-warning mt-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
