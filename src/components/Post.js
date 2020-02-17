import React from "react";
import { useHistory } from "react-router-dom"

export default function Post({ post }) {
  const history = useHistory();
  const viewPost = (postID) => {
    history.push({
      pathname: '/view',
      search: `?postID=${postID}`
    })
  }
  return (
    <div className="card col-12 mb-3">
      <div className="card-body card-pointer" onClick={() => viewPost(post.postID)}>
        <h5 className="card-title">{post.text} <span style={{float: "right"}} className="badge badge-pill badge-secondary">{post.__typename}</span></h5>
        <h6 className="card-subtitle mb-2 text-muted">
          by {post.author.username}
        </h6>
      </div>
    </div>
  );
}
