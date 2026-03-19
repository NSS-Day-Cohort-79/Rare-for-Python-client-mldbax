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
      <div className="columns is-centered">
        <div className="column is-half">
          {allPosts.map((post) => {
            return (
              <div className="card mb-5" key={post.id}>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={post.image_url} alt={post.title} />
                  </figure>
                </div>
                <div className="card-content">
                  <Link to={`/posts/${post.id}`}>
                    <p className="title is-5 mb-2">{post.title}</p>
                  </Link>
                  <p className="mb-5">
                    Author: {post?.user.first_name} {post?.user.last_name}
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
