// Import the useEffect hook for managing side effects (async operations, subscriptions, etc.)
// Import the useState hook for managing component state (reactive data)
import { useEffect, useState } from "react";

// Import the useParams hook from React Router to extract URL parameters from the current route
import { useParams } from "react-router-dom";

// Import the getPostById function from the PostsManager module to fetch individual post data from the API
import { getPostById } from "../../managers/PostsManager";

// Define and export the ViewPostDetail component as a named export
export const ViewPostDetails = () => {
  // Initialize state variable 'post' with an initial value of null
  // 'setPost' is the function used to update the post state
  const [post, setPost] = useState({});

  // Initialize state variable 'loading' with an initial value of true
  // 'setLoading' is the function used to update the loading state
  // This tracks whether the API request is in progress
  const [loading, setLoading] = useState(true);

  // Initialize state variable 'error' with an initial value of null
  // 'setError' is the function used to update the error state
  // This stores any error messages that occur during the API request
  const [error, setError] = useState(null);

  // Use the useParams hook to extract the 'postId' parameter from the URL
  // This value comes from the route definition (e.g., /posts/:postId)
  const { postId } = useParams();

  // The useEffect hook runs side effects after the component renders
  // This effect fetches the post data when the component mounts or when postId changes
  useEffect(() => {
    // Call the getPostById function with the postId to fetch the specific post from the API
    getPostById(postId)
      // .then() handles the successful response - sets the post state with the returned data
      .then(setPost)
      // .catch() handles any errors that occur during the fetch - sets the error state
      .catch((err) => setError(err))
      // .finally() executes after either success or failure - sets loading to false
      .finally(() => setLoading(false));
    // Dependency array: this effect runs whenever postId changes
  }, [postId]);

  // Early return: if data is still loading, display a loading message
  if (loading) return <p>Loading post...</p>;

  // Early return: if an error occurred, display the error message to the user
  if (error) return <p>Error loading post: {error.message}</p>;

  // Early return: if post data is null (not found), display a not found message
  if (!post) return <p>Post not found</p>;

  // Create a new Date object from the post's publication_date string
  // Use the toLocaleDateString() method to format it as MM/DD/YYYY based on browser locale
  const formattedDate = new Date(post.publication_date).toLocaleDateString();

  // Return the JSX that renders the post detail view
  return (
    // Outer container div using Bulma CSS framework's 'container' class for responsive layout
    <div className="container">
      
      <div className="columns is-centered">
        
        <div className="column is-two-thirds">
          {/* Conditional rendering: only display the image if post.image_url exists */}
          {post.image_url && (
            // HTML figure element for semantic image markup
            <figure className="image is-16by9 mb-5">
              {/* Image tag with source URL and alt text for accessibility */}
              <img src={post.image_url} alt={post.title} />
            </figure>
          )}

          {/* Content wrapper div using Bulma's 'content' class for styled typography */}
          <div className="content">
            {/* Render the post title as an h1 heading with Bulma 'title is-2' styling */}
            <h1 className="title is-2">{post.title}</h1>

            {/* Container div for metadata (author and publication date) with bottom margin spacing */}
            <div className="mb-4">
              {/* Paragraph displaying the author's full name using template literal with conditional rendering */}
              {/* The optional chaining operator (?.) prevents errors if user object doesn't exist */}
              <p className="mb-2">
                <strong>By:</strong> {post.user.first_name} {post.user.last_name}
              </p>
              
              {/* Paragraph displaying the formatted publication date */}
              <p>
                <strong>Published:</strong> {formattedDate}
              </p>
            </div>

            {/* Horizontal rule (divider line) to visually separate metadata from content */}
            <hr />

            {/* Container div for the main post content with custom 'post-content' class */}
            <div className="post-content">
              {/* Render the post's body content (the main article text) */}
              {post.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};