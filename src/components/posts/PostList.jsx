import { useEffect, useState } from "react";
import { getApprovedPosts } from "../../managers/PostsManager";
import { Link } from "react-router-dom";

export const PostList = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    // get all posts
    getApprovedPosts().then(setAllPosts);
  }, []);

  return (
    <div className="container">
      {/* CD - Added bar to hold new button on the right of the screen */}
      <nav className="level">
        <div className="level-left"></div>
        <div className="level-right">
          <p className="level-item">
            <a className="button is-success" href="/posts/new">
              New
            </a>
          </p>
        </div>
      </nav>
      <div className="columns is-centered">
        <div className="column is-half">
          {allPosts.map((post) => {
            return (
              <div className="card mb-5" key={post.id}>
                {/* CD - only show image if image_url is populated */}
                {post.imageUrl && (
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={post.imageUrl} alt={post.title} />
                    </figure>
                  </div>
                )}
                <div className="card-content">
                  <Link to={`/posts/${post.id}`}>
                    <p className="title is-5 mb-2">{post.title}</p>
                  </Link>
                  <p className="mb-5">
                    Author: {post?.user.firstName} {post?.user.lastName}
                  </p>
                  <span className="tag is-primary">{post?.category.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
