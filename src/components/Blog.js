import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, upvoteBlog, removeBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleUpvote = () => {
    upvoteBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if(window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      removeBlog(blog.id)
    }
  }

  if(!expanded){
    return (
      <div style={blogStyle} className='initialState'>
        {blog.title} {blog.author} <button onClick={() => setExpanded(!expanded)}>view</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className='expandedState'>
        {blog.title} {blog.author} <button onClick={() => setExpanded(!expanded)}>hide</button><br />
        {blog.url}<br />
        likes: {blog.likes} <button onClick={handleUpvote}>like</button><br />
        {blog.user.name}<br />
        <button onClick={handleDelete}>remove</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  upvoteBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
