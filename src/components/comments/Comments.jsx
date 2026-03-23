import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByPostId } from "../../managers/CommentsManager";

export const Comments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByPostId(postId).then((c) => {
      setComments(c);
    });
  }, [postId]);

  return (
    <>
      <div className="container">
        <div className="section is-normal">
          <h1 className="title">{comments[0]?.post?.title}</h1>
        </div>
      </div>
    </>
  );
};
