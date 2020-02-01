import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

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

const DELETE_POST = gql`
mutation deletePost($postID: ID!) {
  deletePost(filter: {postID: [$postID]}) {
    msg
  }
}
`;

export default function ViewPost(props) {
  const history = useHistory();
  const editPost = (postID) => {
    history.push({
      pathname: '/edit',
      search: `?postID=${postID}`
    })
  }
  let params = queryString.parse(props.location.search);
  let postID = params.postID;

  const { loading, error, data } = useQuery(GET_POST, { variables: { postID }, fetchPolicy: "network-only" });
  const [deletePost] = useMutation(DELETE_POST);

  if (loading) return "Fetching Posts...";
  if (error) return `Error: ${error}`;
  const post = data.getPost;
  const updateLikes = () => {

  }

  return (
    <div className="container">
      <div className="h3 text-center">{post.title}
      <button type="button" className="btn btn-primary btn-sm" style={{float: "right"}} onClick={async e => {
          e.preventDefault();
          await deletePost({ variables: { postID } })
          history.push({
            pathname: '/'
          }); 
        }}>
          Delete
        </button>
        <button type="button" className="btn btn-primary btn-sm" style={{float: "right", marginRight: "5px"}} onClick={() => editPost(post.postID)}>
          Edit
        </button>
      </div>
      <hr />
      <div style={{ whiteSpace: "pre-wrap", marginBottom: "10px" }}>{post.text}</div>
      <div>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => updateLikes}>
          Likes <span className="badge badge-light">{post.numLikes}</span>
        </button>
        <span style={{ float: "right" }}>
          {post.tags.map(tag => (
            <span
              className="badge badge-secondary"
              key={tag}
              style={{ margin: "2px" }}
            >
              {tag}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
