import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { Button, Comment, Form, Header, Feed, Icon } from "semantic-ui-react";

const GET_QUESTION = gql`
  query QUESTION($questionID: ID!) {
    getQuestion(id: $questionID) {
      id
      title
      text
      tags
      likes
      datePublished
      answers {
        id
        text
        author {
          username
        }
        comments {
            text
            datePublished
            author {
                username
            }
            comments {
                text
                datePublished
                author {
                    username
                }
            }
        }
        datePublished
      }
      comments {
        id
        text
        datePublished
        comments {
          text
          datePublished
          author {
            username
          }
          comments {
            text
            datePublished
            author {
              username
            }
          }
        }
        author {
          username
        }
      }
      author {
        username
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation addComment($reply: String!, $questionID: ID!) {
    addComment(input: { text: $reply, commentsOn: { id: $questionID } }) {
      text
    }
  }
`;

const ADD_ANSWER = gql`
  mutation addAnswer($answer: String!, $questionID: ID!){
    addAnswer(input: { text: $answer, inAnswerTo: { id: $questionID } }) {
      text
    }
  }
`;

export default function ViewQuestion(props) {
  const [numLikes, setNumLikes] = useState(0);
  const [answer, setAnswer] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const history = useHistory();
  
  let params = queryString.parse(props.location.search);
  let questionID = params.questionID;

  const { loading, error, data } = useQuery(GET_QUESTION, {
    variables: { questionID },
    fetchPolicy: "network-only"
  });
  const [addAnswer] = useMutation(ADD_ANSWER);

  if (loading) return "Fetching Posts...";
  if (error) return `Error: ${error}`;
  const post = data.getQuestion;
  console.log("dadsa", data);
  if (numLikes === 0) {
    setNumLikes(post.numLikes);
  }

  return (
    <div className="container">
      <div className="h3 text-center">
        {post.title}
        {/* <span className="delete-post" onClick={async e => {
          e.preventDefault();
          await deletePost({ variables: { postID } })
          history.push({
            pathname: '/'
          }); 
        }}>
          <i className="icon-trash" aria-hidden="true"></i>
        </span> */}
        {/* <span className="edit-post" onClick={() => editPost(post.postID)}>
          <i className="icon-edit" aria-hidden="true"></i>
        </span> */}
      </div>
      <hr />
      <div className="text-post">
        {post.text}
        <span className="tagsset-post">
          {post.tags.map(tag => (
            <span className="badge badge-secondary tag-post" key={tag}>
              {tag}
            </span>
          ))}
        </span>
      </div>
      <Feed.Like>
        <Icon name="like" />
        {post.likes} Likes
      </Feed.Like>
      <Comment.Group>
        <Header as="h5" dividing>
          Comments
        </Header>

        <Comment>
          {post.comments.length !== 0 &&
            post.comments.map(commentL1 => {
              return (
                <Comment.Content key={commentL1.id}>
                  <Comment.Author as="a">
                    {commentL1.author.username}
                  </Comment.Author>
                  <Comment.Metadata>
                    <span>
                      {new Date(commentL1.datePublished).toLocaleString()}
                    </span>
                  </Comment.Metadata>
                  <Comment.Text>{commentL1.text}</Comment.Text>
                </Comment.Content>
              );
            })}
          <Comment.Group collapsed={collapsed}>
            <Comment>
              {post.comments.length !== 0 &&
                post.comments[0].comments.length !== 0 && (
                  <Comment.Content>
                    <Comment.Author as="a">
                      {post.comments[0].comments[0].author.username}
                    </Comment.Author>
                    <Comment.Metadata>
                      <span>
                        {new Date(
                          post.comments[0].comments[0].datePublished
                        ).toLocaleString()}
                      </span>
                    </Comment.Metadata>
                    <Comment.Text>
                      {post.comments[0].comments[0].text}
                    </Comment.Text>
                  </Comment.Content>
                )}
              <Comment.Group>
                <Comment>
                  {post.comments.length !== 0 &&
                    post.comments[0].comments.length !== 0 &&
                    post.comments[0].comments[0].comments.length !== 0 && (
                      <Comment.Content>
                        <Comment.Author as="a">
                          {
                            post.comments[0].comments[0].comments[0].author
                              .username
                          }
                        </Comment.Author>
                        <Comment.Metadata>
                          <span>
                            {new Date(
                              post.comments[0].comments[0].comments[0].datePublished
                            ).toLocaleString()}
                          </span>
                        </Comment.Metadata>
                        <Comment.Text>
                          {post.comments[0].comments[0].comments[0].text}
                        </Comment.Text>
                      </Comment.Content>
                    )}
                </Comment>
              </Comment.Group>
            </Comment>
          </Comment.Group>
        </Comment>
        {post.comments.length !== 0 && collapsed && (
          <button
            type="button"
            className="btn btn-link"
            onClick={e => setCollapsed(false)}
          >
            More comments
          </button>
        )}
      </Comment.Group>
      <Comment.Group>
        <Header as="h5" dividing>
          Answers
        </Header>
        <Comment>
        {post.answers.map(answer => (
            <Comment.Content key={answer.id}>
              <Comment.Author as="a">{answer.author.username}</Comment.Author>
              <Comment.Metadata>
                <span>{new Date(answer.datePublished).toLocaleString()}</span>
              </Comment.Metadata>
              <Comment.Text>{answer.text}</Comment.Text>
            </Comment.Content>
        ))}
       <Comment.Group>
            <Comment>
              {post.answers.length !== 0 &&
                post.answers[0].comments.length !== 0 && (
                  <Comment.Content>
                    <Comment.Author as="a">
                      {post.answers[0].comments[0].author.username}
                    </Comment.Author>
                    <Comment.Metadata>
                      <span>
                        {new Date(
                          post.answers[0].comments[0].datePublished
                        ).toLocaleString()}
                      </span>
                    </Comment.Metadata>
                    <Comment.Text>
                      {post.answers[0].comments[0].text}
                    </Comment.Text>
                  </Comment.Content>
                )}
              <Comment.Group>
                <Comment>
                  {post.answers.length !== 0 &&
                    post.answers[0].comments.length !== 0 &&
                    post.answers[0].comments[0].comments.length !== 0 && (
                      <Comment.Content>
                        <Comment.Author as="a">
                          {
                            post.answers[0].comments[0].comments[0].author
                              .username
                          }
                        </Comment.Author>
                        <Comment.Metadata>
                          <span>
                            {new Date(
                              post.answers[0].comments[0].comments[0].datePublished
                            ).toLocaleString()}
                          </span>
                        </Comment.Metadata>
                        <Comment.Text>
                          {post.answers[0].comments[0].comments[0].text}
                        </Comment.Text>
                      </Comment.Content>
                    )}
                </Comment>
              </Comment.Group>
            </Comment>
          </Comment.Group>
          </Comment> 
        <Form reply>
          <Form.TextArea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <Button
            content="Add Answer"
            labelPosition="left"
            icon="edit"
            primary
            onClick={async e => {
              e.preventDefault();
              await addAnswer({ variables: { answer, questionID } });
              history.push({
                pathname: '/',
              }); 
              history.push({
                pathname: '/view',
                search: `?questionID=${questionID}`
              });
            }}
          />
        </Form>
      </Comment.Group>
     
      <div>
        {/* <button type="button" className="btn btn-primary btn-sm" onClick = { async e => {
          e.preventDefault()
          await updatePost({ variables: { postSet, postID} })
          history.push({
            pathname: '/',
          }); 
          history.push({
            pathname: '/view',
            search: `?postID=${postID}`
          });
        }}>
          Likes <span className="badge badge-light">{post.numLikes}</span>
        </button> */}
      </div>    
    </div>
  );
}
