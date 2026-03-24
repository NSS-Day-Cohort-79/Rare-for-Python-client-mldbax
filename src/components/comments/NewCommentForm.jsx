import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const NewCommentForm = ({ token }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    postId: parseInt(postId),
    authorId: parseInt(token),
    subject: "",
    content: "",
  });

  return <></>;
};
