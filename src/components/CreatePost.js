import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";

import AuthorSelect from "./AuthorSelect";

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

export default function AddPost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState("");

  const history = useHistory();

  const handleChangeAuthor = (authorName, authorId) =>
    setAuthorId(authorId);

  const post = {
    title,
    text,
    isPublished: true,
    author: {
      id: authorId
    }
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="authorSelect">Select Author:</label>
        <AuthorSelect onChange={handleChangeAuthor} />
      </div>

      <div className="form-group">
        <label htmlFor="postTitle">Enter Title:</label>
        <input
          id="postTitle"
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Add Title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="postText">Post Content:</label>
        <textarea
          id="postText"
          className="form-control"
          rows="15"
          cols="100"
          value={text}
          onChange={e => setText(e.target.value)}
          type="text"
          placeholder="Add your blog post"
        />
      </div>
      <Mutation mutation={POST_MUTATION} variables={{ post }}>
        {postMutation => (
          <button
              type="submit"
              className="btn btn-primary"
              onClick={async e => {
                e.preventDefault();
                await postMutation();
                history.push("/");
              }}
          >
            Publish
          </button>
        )}
      </Mutation>
    </form>
  );
}
