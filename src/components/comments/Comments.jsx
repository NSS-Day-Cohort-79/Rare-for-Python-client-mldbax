import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteComment,
  getCommentsByPostId,
} from "../../managers/CommentsManager";
import { getPostById } from "../../managers/PostsManager";

export const Comments = ({ token }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});

  // get comments using postId from db, add them to array
  useEffect(() => {
    getComments();
  }, [postId]);

  // get post title from postId, in case there are no comments
  useEffect(() => {
    getPostById(postId).then((p) => {
      setPost(p);
    });
  }, [postId]);

  const getComments = () => {
    return getCommentsByPostId(postId).then((c) => {
      setComments(c);
    });
  };

  const handleCommentDelete = (commentId) => {
    const yesDelete = window.confirm(
      "Are you sure you want to delete this comment?",
    );
    if (yesDelete) {
      deleteComment(commentId).then(getComments);
    }
  };

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
                    <div className="level">
                      <div className="title level-left">{comment.subject}</div>
                      <div className="level-right">
                        {parseInt(token) === comment.author.authorId ? (
                          <div>
                            <Link
                              className="button is-link is-small"
                              to={`${comment.id}/edit`}
                            >
                              Edit
                            </Link>
                            <button
                              className="button is-danger is-small ml-3"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCommentDelete(comment.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="content">{comment.content}</div>
                    <div className="level">
                      <div className="level-left">
                        {comment.author.firstName} {comment.author.lastName}
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
