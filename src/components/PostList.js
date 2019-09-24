import React, { Component } from 'react'
import Post from './Post'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_POSTS = gql`
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
`
class PostList extends Component {
  render() {
    return (
        <Query query={GET_POSTS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) {
            const errorMsg = `Error occured while rendering posts.\nError: ${error}`
            console.log(errorMsg)
            return <div>{errorMsg}</div>
          } 
    
          const posts = data.queryPost
          console.log(data)
          return (
            <div>
              {posts.map(post => <Post key={post.postID} post={post} />)}
            </div>
          )
        }}
      </Query>
   
    )
  }
}

export default PostList