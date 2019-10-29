import React from "react";

export default function Post({ post }) {
  return (
    <div class="card col-12 mb-3">
      <div class="card-body">
        <h5 class="card-title">Title: {post.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          by {post.author.name}
        </h6>
        {post.text}
      </div>
    </div>
  );
}
