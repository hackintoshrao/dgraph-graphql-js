import React from "react";

export default function Post({ post }) {
  return (
    <div>
      <div>
        <h1> Title: {post.title} </h1>
      </div>
      <div>{post.text}</div>
      <div>
        <small>- By {post.author.name}</small>
      </div>
    </div>
  );
}
