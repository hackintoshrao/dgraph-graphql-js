import React from "react";

export default function Post({ post }) {
  return (
    <div className="card col-12 mb-3">
      <div className="card-body">
        <h5 className="card-title">Title: {post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          by {post.author.name}
        </h6>
        <p className="card-text">
          {post.text}
        </p>
      </div>
    </div>
  );
}
