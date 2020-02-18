import React from "react";
import { useHistory } from "react-router-dom"
import { Card } from 'semantic-ui-react'
import ViewQuestion from "./ViewQuestion";

export default function Post({ post }) {
  const history = useHistory();
  const viewQuestion = (questionID) => {
    history.push({
      pathname: '/view',
      search: `?questionID=${questionID}`
    })
  }
  return (
    <Card
      onClick={() => viewQuestion(post.id)}
      header={post.title}
      meta={post.author.username}
      description={post.text}
    />
  );
}
