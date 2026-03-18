import { useEffect, useState } from "react";
import { getAllTags } from "../../managers/TagManager";

export const TagList = () => {
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    getAllTags().then(setAllTags);
  }, []);

  return (
    <>
      {allTags.map((tag) => {
        return <div key={tag.id}>{tag.label}</div>;
      })}
    </>
  );
};
