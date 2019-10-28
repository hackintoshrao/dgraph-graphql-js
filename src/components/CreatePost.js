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

  const handleChangeAuthor = (authorName, authorId) =>
    setAuthorId(authorId);

  const onChangeTitle = e => setTitle(e.target.value);

  const post = {
    title,
    text,
    isPublished: true,
    author: {
      id: authorId
    }
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <AuthorSelect onChange={handleChangeAuthor} />
        <input
          className="mb2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Add Title"
        />
        <textarea
          className="mb2"
          rows="15"
          cols="100"
          value={text}
          onChange={e => setText(e.target.value)}
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
