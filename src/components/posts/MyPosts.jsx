// Import React hooks for state management and side effects
import { useEffect, useState } from "react";
import { getPostsByUserId, deletePost } from "../../managers/PostsManager";
import { Link } from "react-router-dom";

// MyPosts Component: Displays all posts authored by the current logged-in user
export const MyPosts = () => {
  // State management for user's posts, loading, and errors
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all posts by the current user when component mounts
  useEffect(() => {
    // Get the token (which is the user ID) from localStorage
    const token = localStorage.getItem("token");
    const userId = token;
    
    if (userId) {
      getPostsByUserId(userId)
        .then(setMyPosts)
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    } else {
      setError("User not found");
      setLoading(false);
    }
  }, []);

  // Handle deleting a post
  const handleDeletePost = (postId) => {
    // Confirm deletion before proceeding
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(postId)
        .then(() => {
          // Remove the deleted post from the state
          setMyPosts(myPosts.filter((post) => post.id !== postId));
        })
        .catch((err) => setError(err));
    }
  };

  // Handle loading state
  if (loading) return <p>Loading your posts...</p>;

  // Handle error state
  if (error) return <p>Error loading posts: {error.message || error}</p>;

  // Sort posts by creation date (most recent first)
  const sortedPosts = [...myPosts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds">
          <h1 className="title">My Posts</h1>

          {sortedPosts.length === 0 ? (
            <p>You haven't written any posts yet.</p>
          ) : (
            sortedPosts.map((post) => (
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