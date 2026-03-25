import { useEffect, useState } from "react";
import { deleteTag, getAllTags } from "../../managers/TagManager";

export const TagList = () => {
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    getAllTags().then(setAllTags);
  }, []);

  // handle delete passing tag id add alert to make sure admin wants to delete it
  const handleDelete = (id) => {
    const yesDelete = window.confirm("Are you sure you want to delete this tag?");
    if (yesDelete) {
      deleteTag(id).then(() => {
        getAllTags().then((tags) => {
          setAllTags(tags)
        })
      })
    }
  }

  return (
    <>
      <div className="container">
      <nav className="level">
            <div className="level-left"></div>
            <div className="level-right">
              <p className="level-item"></p>
      <a class="button is-success" href="tags/new">
        Create Tag
          </a>
        </div>
        </nav>
      <div class="container">
        <div class="section is-normal">
          <h1 class="title">Tags</h1>
          {allTags.map((tag) => {
            return (
              <div class="tags has-addons are-medium" key={tag.id}>
                <a class="tag is-link is-hoverable" href="/">
                  {tag.label}
                </a>
                <a class="tag is-light" href="/">
                  &#9881;
                </a>
                <a class="tag is-delete" href="/" onClick={(e) => {
                  e.preventDefault()
                  handleDelete(tag.id)
                 } }>
                </a>
              </div>
            );
          })}
        </div>
        </div>
        </div>
    </>
  );
};
