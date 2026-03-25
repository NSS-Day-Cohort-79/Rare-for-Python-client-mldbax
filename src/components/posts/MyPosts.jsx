import { useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../managers/PostsManager";
import { Link } from "react-router-dom";

export const MyPosts = ({ token }) => {
  console.log("MyPosts received token:", token);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's posts when component mounts or when token (user) changes
  useEffect(() => {
    console.log("useEffect running with token:", token);
    
    setLoading(true);
    const userId = token;
    
    if (userId) {
      console.log("Fetching posts for userId:", userId);
      getUserPosts(userId)
        .then((response) => {
          console.log("Response from backend:", response)
          let postsArray = [];
          if (Array.isArray(response)) {
            postsArray = response;
          } else if (response?.results && Array.isArray(response.results)) {
            postsArray = response.results;
          } else if (response?.data && Array.isArray(response.data)) {
            postsArray = response.data;
          } else if (response && response.id) {
            postsArray = [response];
          }
          setMyPosts(postsArray);
          setError(null);
        })
        .catch((err) => {
          setError(err);
          setMyPosts([]);
        })
        .finally(() => setLoading(false));
    } else {
      setError("User not found");
      setMyPosts([]);
      setLoading(false);
    }
  }, [token]); // Re-run when token changes

  // Delete a post after user confirmation
  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(postId)
        .then(() => {
          setMyPosts(myPosts.filter((post) => post.id !== postId));
        })
        .catch((err) => setError(err));
    }
  };

  if (loading) return <p>Loading your posts...</p>;
  if (error) return <p>Error loading posts: {error.message || error}</p>;

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds">
          <h1 className="title">My Posts</h1>
          {myPosts.length === 0 ? (
            <p>You haven't written any posts yet.</p>
          ) : (
            myPosts.map((post) => (
              <div className="card mb-5" key={post.id}>
                <div className="card-content">
                  <Link to={`/posts/${post.id}`}>
                    <p className="title is-5 mb-2">{post.title}</p>
                  </Link>
                  <p className="mb-3">
                    Author: {post.user.first_name} {post.user.last_name}
                  </p>
                  <p className="mb-3">
                    Category: {post.category.label}
                  </p>
                  <div className="buttons">
                    <button 
                      className="button is-danger"
                      onClick={() => handleDeletePost(post.id)}
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
  );
};