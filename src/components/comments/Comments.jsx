import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByPostId } from "../../managers/CommentsManager";

export const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByPostId(id).then((c) => {
      setComments(c);
    });
  }, []);

  return <></>;
};
