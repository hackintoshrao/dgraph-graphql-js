import React from "react";
import Post from "./Post";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks"
import queryString from 'query-string'

// const GET_FILTERED_BLOG_POSTS = gql`
//   query Post($search: String!){
//     queryPost(filter:{or: {title: {anyoftext: $search}, or:{text:{anyoftext:$search}}}, tags:{eq:$search}}){
//       postID
//       title
//       text
//       numLikes
//       isPublished
//       author {
//         id
//         name
//         dob
//       }
//     }
//   }
// `;

const GET_TOP_POSTS = gql`
  query {
    myTopPosts {
      text
      author {username}
    }
  }
`

const ADD_ANSWER = gql`
mutation {
  addAnswer(input: {text: "Yo", inAnswerTo: {id: "0x3"}}) {
    text
  }
}`

const ADD_COMMENT = gql`
mutation {
  addComment(input: {text: "Yo", commentsOn: {id: "0x3"}}) {
    text
  }
}`

const ADD_QUESTION = gql`
mutation {
  addQuestion(input: {text: "What's up?"}) {
    text
  }
}`

const ADD_POST = gql`
mutation {
  addPost(input: {title: "hahaha", text: "sadhsdahsadh", author: {username: "apoorv16", email: "apoorv@dgraph.io"}}) {
      title
  }
}`

const EDIT_POST_TEXT = gql`
mutation {
  editPostText(id: "0x7", newText: "sdfsfdfdsdsfdsf") {
    text
  }
}
`

const LIKE_POST = gql`
mutation {
  likePost(id: "0x7", likes: 0) {
    text
  }
}
`

const GET_ALL_BLOG_POSTS = gql`
  { queryPost {
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
  // let params, search = "";
  // if (props.location.search !== "") {
  //     params = queryString.parse(props.location.search)
  //     search = params.search;  
  // } 
  // let query = GET_FILTERED_BLOG_POSTS;
  // if (search === "") {
  //   query = GET_ALL_BLOG_POSTS;
  // }

  const [addQuestion] = useMutation(ADD_COMMENT)
  // const [addPost] = useMutation(ADD_POST)
  // const getPost = async () => {
  //   const result = await addPost();
  //   console.log("result", result)
  // } 
  // getPost();

  const {loading, error, data } = useQuery(GET_TOP_POSTS, {fetchPolicy: "network-only"});
  if (loading) return "Fetching Posts...";
  if (error) return `Error: ${error}`;
  const posts = data.myTopPosts;
  console.log("data", data.myTopPosts)
        
  return (
          <div className="container">
            <button onClick = {async e => {
                e.preventDefault()
                await addQuestion()}}>hahaha</button>
            {posts.map(post => (
              <Post key={post.text} post={post} />
            ))}
          </div>
    );
}
