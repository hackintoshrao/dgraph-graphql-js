import React, { Component } from "react";

class Post extends Component {
  render() {
    return (
      <div>
        <div>
          <h1> Title: {this.props.post.title} </h1>
        </div>
        <div>{this.props.post.text}</div>
        <div>
          <small> - By {this.props.post.author.name} </small>
        </div>
      </div>
    );
  }
}

export default Post;
