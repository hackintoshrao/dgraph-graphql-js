import React, { useState } from "react";
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

export default function Postbox(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState("");

  const handleAuthorSelectFromChild = (authorName, authorId) =>
    setAuthorId(authorId);

  const onChangeText = e => setText(e.target.value);

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
        <Selectbox onChange={handleAuthorSelectFromChild} />
        <input
          className="mb2"
          value={title}
          onChange={onChangeTitle}
          type="text"
          placeholder="Add Title"
        />
        <textarea
          className="mb2"
          rows="15"
          cols="100"
          value={text}
          onChange={onChangeText}
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
