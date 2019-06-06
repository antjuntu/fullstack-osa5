import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const loggedUserKey = 'loggedBlogAppUser'

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
        username, 
        password
      })

      window.localStorage.setItem(
        loggedUserKey, JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const logout = () => {
    window.localStorage.removeItem(loggedUserKey)
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={login}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={logout}>logout</button>
      <h2>create new</h2>
      <BlogForm blogs={blogs} setBlogs={setBlogs} />
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App