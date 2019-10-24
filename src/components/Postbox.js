import React, { Component } from "react";
import Selectbox from "./Selectbox";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const POST_MUTATION = gql`
  mutation addPost($post: PostInput!) {
    addPost(input: $post) {
      post {
        postID
        title
        text
        author {
          id
          name
        }
      }
    }
  }
`;

class CreateLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      post: "",
      author: "",
      authorID: ""
    };
    this.handleAuthorSelectFromChild = this.handleAuthorSelectFromChild.bind(
      this
    );
    this.onChangePost = this.onChangePost.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  handleAuthorSelectFromChild(selectedAuthor, uidOfAuthor) {
    this.setState(state => {
      state.author = selectedAuthor;
      state.authorID = uidOfAuthor;
      return state;
    });
  }

  onChangePost(e) {
    e.persist();
    this.setState(function(state) {
      state.post = e.target.value;
      return state;
    });
  }

  onChangeTitle(e) {
    e.persist();
    this.setState(function(state) {
      state.title = e.target.value;
      return state;
    });
  }

  render() {
    const post = {
      title: this.state.title,
      text: this.state.post,
      isPublished: true,
      author: {
        id: this.state.authorID
      }
    };
    
    return (
      <div>
        <div className="flex flex-column mt3">
          <Selectbox onChange={this.handleAuthorSelectFromChild} />
          <input
            className="mb2"
            value={post.title}
            onChange={this.onChangeTitle}
            type="text"
            placeholder="Add Title"
          />
          <textarea
            className="mb2"
            rows="15"
            cols="100"
            value={post.text}
            onChange={this.onChangePost}
            type="text"
            placeholder="Add your blog post"
          />
        </div>
        <Mutation mutation={POST_MUTATION} variables={{ post }}>
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;
