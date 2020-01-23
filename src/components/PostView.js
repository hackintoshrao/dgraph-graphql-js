import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import queryString from "query-string";

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

export default function PostView(props) {
  let params = queryString.parse(props.location.search);
  let postID = params.postID;

  return (
    <Query query={GET_POST} variables={{ postID }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Fetching Posts...</div>;
        }
        if (error) {
          return <div>Error: {error}</div>;
        }
        const post = data.getPost;
        return (
          <div className="container">
            <div className="h3 text-center">{post.title}</div>
            <hr />
            <div style={{ whiteSpace: "pre-wrap" }}>{post.text}</div>
            <div>
              <button type="button" className="btn btn-primary">
                Likes <span className="badge badge-light">{post.numLikes}</span>
              </button>
              <span style={{float: "right"}}>
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
      }}
    </Query>
  );
}
