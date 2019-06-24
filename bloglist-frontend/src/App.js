import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')

  const loggedUserKey = 'loggedBlogAppUser'

  const blogFormRef = React.createRef()

  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  //console.log(username)
  //console.log(password)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loggedUserKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        loggedUserKey, JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      resetUsername()
      resetPassword()
    } catch (exception) {
      setMessage('wrong username or password')
      setType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem(loggedUserKey)
    setUser(null)
  }

  const handleLikesUpdate = (id) => async () => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const updatedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = (id) => async () => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    if (window.confirm(`remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      try {
        await blogService.deleteBlog(id)
        setMessage(`Removed: ${blogToRemove.title} by ${blogToRemove.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} type={type} />
        <form onSubmit={login} className="loginForm">
          <div>
            username
            <input {...username} />
          </div>
          <div>
            password
            <input {...password} />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={type} />
      <p>{user.name} logged in</p>
      <button onClick={logout}>logout</button>

      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setType={setType} hideForm={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      <br />

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLikesUpdate={handleLikesUpdate(blog.id)} handleBlogRemove={deleteBlog(blog.id)} loggedUser={user} />
      )}
    </div>
  )
}

export default App