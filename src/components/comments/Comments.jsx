import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCommentsByPostId } from "../../managers/CommentsManager";
import { getPostById } from "../../managers/PostsManager";

export const Comments = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});

  // get comments using postId from db, add them to array
  useEffect(() => {
    getCommentsByPostId(postId).then((c) => {
      setComments(c);
    });
  }, [postId]);

  // get post title from postId, in case there are no comments
  useEffect(() => {
    getPostById(postId).then((p) => {
      setPost(p);
    });
  }, [postId]);

  return (
    <>
      <div className="container">
        <div className="section is-normal">
          <h1 className="title">"{post.title}" Comments</h1>
          <div className="block level">
            <button
              className="button is-link level-left"
              onClick={() => navigate(`/posts/${postId}`)}
            >
              Return to Post
            </button>
            <button
              className="button is-primary level-right"
              onClick={() => navigate(`new`)}
            >
              New Comment
            </button>
          </div>

          <div className="fixed-grid has-2-cols">
            <div className="grid">
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div className="cell box" key={comment.id}>
                    <div className="title">{comment.subject}</div>
                    <div className="content">{comment.content}</div>
                    <div className="level">
                      <div className="level-left">
                        {comment.author.username}
                      </div>
                      <div className="level-right">
                        {new Date(comment.createdOn).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="level-item">
                  No comments on this post yet, add a comment to start the
                  conversation!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
