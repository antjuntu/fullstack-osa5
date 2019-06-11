import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMessage, setType, hideForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    hideForm()
    const blogObject = {
      title,
      author,
      url
    }

    let addedBlog = await blogService.create(blogObject)
    // We need populated user object
    addedBlog = await blogService.get(addedBlog.id)
    setBlogs(blogs.concat(addedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
    setType('success')
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm