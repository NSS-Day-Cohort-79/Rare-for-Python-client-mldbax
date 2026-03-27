import { useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../managers/PostsManager";
import { Link, useNavigate } from "react-router-dom";

export const MyPosts = ({ token }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user's posts when component mounts or when token (user) changes
  useEffect(() => {
    setLoading(true);
    const userId = token;
    if (userId) {
      updateUserPosts();
    }
  }, [token]); // Re-run when token changes

  const updateUserPosts = () => {
    getUserPosts(token).then((response) => {
      setMyPosts(response);
      setLoading(false);
    });
  };
  // Delete a post after user confirmation
  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(postId).then(() => {
        updateUserPosts();
      });
    }
  };

  if (loading) return <p>Loading your posts...</p>;
  if (error) return <p>Error loading posts: {error.message || error}</p>;

  return (
    <main className="pt-5">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <h1 className="title">My Posts</h1>
            {myPosts.length === 0 ? (
              <p>You haven't written any posts yet.</p>
            ) : (
              myPosts.map((post) => (
                <div
                  className="card mb-5"
                  key={post.id}
                  onClick={() => {
                    navigate(`/posts/${post.id}`);
                  }}
                >
                  <div className="card-content">
                    <p className="title is-5 mb-2">{post.title}</p>
                    <p className="mb-3">
                      Author: {post.user.firstName} {post.user.lastName}
                    </p>
                    <p className="mb-3">Category: {post.category.label}</p>
                    <div className="buttons">
                      <button
                        className="button is-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePost(post.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
