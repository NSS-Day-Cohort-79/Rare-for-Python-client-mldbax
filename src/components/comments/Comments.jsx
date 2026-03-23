import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByPostId } from "../../managers/CommentsManager";

export const Comments = () => {
  const { post_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByPostId(post_id).then((c) => {
      setComments(c);
    });
  }, [post_id]);

  return (
    <>
      <div className="container">
        <div className="section is-normal">
            <h1 className="title"></h1>
        </div>
      </div>
    </>
  );
};
