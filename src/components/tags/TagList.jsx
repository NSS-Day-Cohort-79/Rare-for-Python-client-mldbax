import { useEffect, useState } from "react";
import { deleteTag, getAllTags } from "../../managers/TagManager";
import { Link } from "react-router-dom";

export const TagList = () => {
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    getAllTags().then(setAllTags);
  }, []);

  // handle delete passing tag id add alert to make sure admin wants to delete it
  const handleDelete = (id) => {
    const yesDelete = window.confirm(
      "Are you sure you want to delete this tag?",
    );
    if (yesDelete) {
      deleteTag(id).then(() => {
        getAllTags().then((tags) => {
          setAllTags(tags);
        });
      });
    }
  };

  return (
    <>
      <div className="container">
        <nav className="level">
          <div className="level-left"></div>
          <div className="level-right">
            <p className="level-item"></p>
            <a className="button is-success" href="tags/new">
              Create Tag
            </a>
          </div>
        </nav>
        <div className="container">
          <div className="section is-normal">
            <h1 className="title">Tags</h1>
            {allTags.map((tag) => {
              return (
                <div className="tags has-addons are-medium" key={tag.id}>
                  <a className="tag is-info is-hoverable" href="/">
                    {tag.label}
                  </a>
                  <Link className="tag is-light" to={`${tag.id}/edit`} href="/">
                    &#9881;
                  </Link>
                  <Link
                    aria-label="edit tag"
                    className="tag is-delete"
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(tag.id);
                    }}
                  ></Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
