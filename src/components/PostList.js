import React from "react";
import Post from "./Post";
import gql from "graphql-tag";
import { Query } from "react-apollo";

/*
Dgraph's GraphQL layer takes in a GraphQL schema file with the type definitions.
Then, it autogenerates the queries and mutation APIs for the same.

The graphql.schema file in the root of the repo contains all the
GraphQL types which are used as inputs to Dgraph.

From the schema you can see that the GraphQL type for a post look like this,

type Post {
	postID: ID!
	title: String! @search(by: "term")
	text: String @search(by: "fulltext")
	tags: [String] @search(by: "exact")
	topic: String @search(by: "exact")
	numLikes: Int @search
	isPublished: Boolean @search
	postType: PostType @search
 	author(filter: AuthorFilter): Author! @hasInverse(field: "posts")
}

Dgraph's GraphQL layer auto-generates the following queries and mutation API's
corresponding to the above GraphQL type.

1. getPost(id: ID!): Post
2. addPost(input: PostInput!): AddPostPayload
3. updatePost(input: UpdatePostInput!): UpdatePostPayload
4. deletePost(filter: PostFilter!): DeletePostPayload

*/
const GET_BLOG_POSTS = gql`
  {
    queryPost {
      postID
      title
      text
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

export default function PostList() {
  return (
    <Query query={GET_BLOG_POSTS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Fetching Posts...</div>;
        }
        if (error) {
          return <div>Error: {error}</div>;
        }
        const posts = data.queryPost;
        return (
          <section className="post-list">
            {posts.map(post => (
              <Post key={post.postID} post={post} />
            ))}
          </section>
        );
      }}
    </Query>
  );
}
