import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../managers/PostsManager";

// ViewPostDetails Component: Fetches and displays a single post's full details
export const ViewPostDetails = () => {
  // State management for post data, loading, and errors
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  // Fetch post data when component mounts or postId changes
  useEffect(() => {
    getPostById(postId)
      .then(setPost)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [postId]);

  // Handle loading state
  if (loading) return <p>Loading post...</p>;

  // Handle error state
  if (error) return <p>Error loading post: {error.message}</p>;

  // Handle post not found
  if (!post) return <p>Post not found</p>;

  // Format the publication date to MM/DD/YYYY
  const formattedDate = new Date(post.publicationDate).toLocaleDateString();

  return (
    <div className="container mt-6">
      {/* CD - Added bar to hold edit button, title, and category */}
      <nav className="level">
        <div className="level-left">
          <a className="button is-success" href={`/posts/${postId}/edit`}>
            Edit
          </a>
        </div>
        <h1 className="title level-item is-2">{post.title}</h1>
        <div className="level-right">
          <p className="level-item">{post.category.label}</p>
        </div>
      </nav>

      <div className="columns is-centered">
        <div className="column is-two-thirds">
          {post.imageUrl && (
            <figure className="image is-16by9 mb-5">
              <img src={post.imageUrl} alt={post.title} />
            </figure>
          )}
          <div className="content">
            <div className="mb-4">
              <p className="mb-2">
                <strong>By:</strong> {post.user.first_name}{" "}
                {post.user.last_name}
              </p>
              <p>
                <strong>Published:</strong> {formattedDate}
              </p>
              <p className="mb-2">
                <strong>By:</strong> {post.user.first_name}{" "}
                {post.user.last_name}
              </p>
              <p>
                <strong>Published:</strong> {formattedDate}
              </p>
            </div>
            <button
              className="block button is-link is-small"
              onClick={() => navigate(`comments`)}
            >
              View Comments
            </button>
            <div className="post-content">{post.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
