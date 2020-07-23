import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h3>create new</h3>
      <div>title: <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)} /></div>
      <div>author: <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
      <div>url: <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)} /></div>
      <button id='submit-button' type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm