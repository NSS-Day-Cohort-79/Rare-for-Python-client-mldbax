import { useEffect, useState } from "react";
import { getAllTags } from "../../managers/TagManager";

export const TagList = () => {
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    getAllTags().then(setAllTags);
  }, []);

  return (
    <>
      <a class="button is-primary" href="tags/new">
        Create
      </a>
      <div class="container">
        <div class="section is-normal">
          <h1 class="title">Tags</h1>
          {allTags.map((tag) => {
            return (
              <div class="tags has-addons are-medium" key={tag.id}>
                <a class="tag is-primary is-hoverable" href="/">
                  {tag.label}
                </a>
                <a class="tag is-light" href="/">
                  &#9881;
                </a>
                <a class="tag is-delete" href="/">
                  {" "}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
