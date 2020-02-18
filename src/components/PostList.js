import React from "react";
import Post from "./Post";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import queryString from "query-string";
import { Card } from "semantic-ui-react";

const GET_FILTERED_QUESTIONS = gql`
  query Question($search: String!) {
    queryQuestion(
      filter: {
        or: {
          title: { anyofterms: $search }
          or: { text: { anyoftext: $search } }
        }
        tags: { eq: $search }
      }
    ) {
      id
      title
      text
      likes
      author {
        username
      }
    }
  }
`;

const GET_TOP_QUESTIONS = gql`
  query {
    myTopQuestions {
      id
      text
      title
      tags
      author {
        username
      }
    }
  }
`;

const ADD_ANSWER = gql`
  mutation {
    addAnswer(input: { text: "Yo", inAnswerTo: { id: "0x2" } }) {
      text
    }
  }
`;

const ADD_COMMENT = gql`
  mutation {
    addComment(input: { text: "Answercomment2", commentsOn: { id: "0xc" } }) {
      text
    }
  }
`;

const ADD_QUESTION = gql`
  mutation {
    addQuestion(input: { text: "What's up?", title: "New" }) {
      text
    }
  }
`;

const ADD_POST = gql`
  mutation {
    addPost(
      input: {
        title: "hahaha"
        text: "sadhsdahsadh"
        author: { username: "apoorv16", email: "apoorv@dgraph.io" }
      }
    ) {
      title
    }
  }
`;

const EDIT_POST_TEXT = gql`
  mutation {
    editPostText(id: "0x7", newText: "sdfsfdfdsdsfdsf") {
      text
    }
  }
`;

const LIKE_POST = gql`
  mutation {
    likePost(id: "0x7", likes: 0) {
      text
    }
  }
`;

const GET_ALL_BLOG_POSTS = gql`
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

export default function PostList(props) {
  let params,
    search = "";
  if (props.location.search !== "") {
    params = queryString.parse(props.location.search);
    search = params.search;
  }
  let query = GET_FILTERED_QUESTIONS;
  let selectionSet = "queryQuestion";
  if (search === "") {
    query = GET_TOP_QUESTIONS;
    selectionSet = "myTopQuestions";
  }

  const [addQuestion] = useMutation(ADD_COMMENT);

  const { loading, error, data } = useQuery(query, {
    variables: { search },
    fetchPolicy: "network-only"
  });
  if (loading) return "Fetching Posts...";
  if (error) return `Error: ${error}`;
  const posts = data[selectionSet];
  console.log("data", data[selectionSet]);

  return (
    <div className="container">
      <button onClick = {async e => {
                e.preventDefault()
                await addQuestion()}}>hahaha</button>
      <Card.Group itemsPerRow={1}>
        {posts.map(post => (
          <Post key={post.text} post={post} />
        ))}
      </Card.Group>
    </div>
  );
}
