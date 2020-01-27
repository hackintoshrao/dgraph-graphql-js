import React, { useState } from "react";
import gql from "graphql-tag";
import queryString from "query-string";
import { Mutation, Query } from "react-apollo";
import { useHistory } from "react-router-dom";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import AuthorSelect from "./AuthorSelect";

const POST_MUTATION = gql`
  mutation updatePost($postUpdate: PostPatch!, $postID: ID!) {
    updatePost(input: {filter: {postID: [$postID]}, set: $postUpdate}) {
      post {
        postID
        title
        text
        tags
        author {
          id
          name
        }
      }
    }
  }
`;

const GET_POST = gql`
  query Post($postID: ID!) {
    getPost(postID: $postID) {
      postID
      title
      text
      tags
      numLikes
      isPublished
      author {
        id
        name
        dob
      }
    }
  }
`;

export default function EditPost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [tags, setTags] = useState([]);

  const history = useHistory();

  const handleChangeAuthor = (authorName, authorId) => setAuthorId(authorId);

  const postUpdate = {
      title,
      text,
      tags,
      isPublished: true,
      author: {
          id: authorId
      } 
  }

  let params = queryString.parse(props.location.search);
  let postID = params.postID;
  const handleChangeTags = tagsSet => {
    setTags(tagsSet);
  };

  return (
    <div>
      <Query query={GET_POST} variables={{ postID }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Fetching Posts...</div>;
          }
          if (error) {
            return <div>Error: {error}</div>;
          }
          const post = data.getPost;
          if (title === "") {
            setTitle(post.title);
            setText(post.text);
            setTags(post.tags);
            setAuthorId(post.author.id)
          }
          return (
            <div className="container">
              <div className="form-group">
                <label htmlFor="authorSelect">Author:</label>
                <AuthorSelect
                  author={post.author.name}
                  onChange={handleChangeAuthor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postTitle">Title:</label>
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
                <label htmlFor="postTags">Tags:</label>
                <TagsInput value={tags} onChange={handleChangeTags} />
              </div>
              <div className="form-group">
                <label htmlFor="postText">Content:</label>
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
            </div>
          );
        }}
      </Query>
      <Mutation mutation={POST_MUTATION} variables={{ postUpdate, postID }}>
        {postMutation => (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={async e => {
              e.preventDefault();
              await postMutation();
              history.push({
                pathname: '/view',
                search: `?postID=${postID}`
              });
            }}
          >
            Publish
          </button>
        )}
      </Mutation>
    </div>

    // </div>
  );
}
