import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedInBlogUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedInBlogUserJSON) {
      const user = JSON.parse(loggedInBlogUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      )
      setNotification({
        message: `${user.username} has logged in!`,
        className: 'success'
      })
      setUser(user)
    } catch (exception) {
      setNotification({
        message: 'invalid username or password',
        className: 'error'
      })
    }
    setUsername('')
    setPassword('')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedInBlogUser')
  }

  const handleNewBlog = async (newBlog) => {
    try {
      const response = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(response))
      setNotification({
        message: `a new blog ${response.title} by ${response.author} was added`,
        className: 'success'
      })
    } catch (exception) {
      setNotification({
        message: 'error adding blog',
        className: 'error'
      })
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleBlogUpvote = async (newBlog) => {
    try {
      const updatedBlog = await blogService.update(newBlog)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    } catch (exception) {
      console.log('exception:', exception)
      setNotification({
        message: 'error upvoting blog',
        className: 'error'
      })
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleBlogDelete = async (blogId) => {
    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      setNotification({
        message: 'removed from the list',
        className: 'success'
      })
    } catch(exception) {
      setNotification({
        message: 'error deleting blog',
        className: 'error'
      })
    }
  }

  const blogForm = () => {
    return (
      <Toggleable buttonLabel='add blog'>
        <BlogForm createBlog={handleNewBlog} />
      </Toggleable>
    )
  }

  if(!user) {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <div>username: <input id='username' type='test' value={username} onChange={({ target }) => setUsername(target.value)} /></div>
        <div>password: <input id='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} /></div>
        <button id='submit-button' type='submit'>login</button>
      </form>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} upvoteBlog={handleBlogUpvote} removeBlog={handleBlogDelete} />
      )}
    </div>
  )
}

export default App