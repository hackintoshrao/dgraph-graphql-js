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
    const posts = [
        {
            "postID": "0x7",
            "title": "Karthics's post",
            "text": "really good post",
            "numLikes": null,
            "isPublished": true,
            "author": {
                "id": "0x6",
                "name": "Karthic",
                "dob": "1991-01-01T00:00:00Z"
            }
        },
        {
            "postID": "0x8",
            "title": "Karthics's 2nd  post",
            "text": "Post on GraphQL post",
            "numLikes": null,
            "isPublished": true,
            "author": {
                "id": "0x6",
                "name": "Karthic",
                "dob": "1991-01-01T00:00:00Z"
            }
        },
        {
            "postID": "0x9",
            "title": "Karthics's 3rd  post",
            "text": "Post on new release",
            "numLikes": null,
            "isPublished": true,
            "author": {
                "id": "0x6",
                "name": "Karthic",
                "dob": "1991-01-01T00:00:00Z"
            }
        }
    ]

    return (
        <Query query={GET_POSTS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) {
            console.log("my error")
            console.log(error)
            return <div>error</div>

          } 
    
          const posts = data.queryPost
    
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