import React from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks'

const BlogForm = ({ blogs, setBlogs, setMessage, setType, hideForm }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('author')
  const { reset: resetUrl, ...url } = useField('text')

  const addBlog = async (event) => {
    event.preventDefault()
    hideForm()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    let addedBlog = await blogService.create(blogObject)
    // We need populated user object
    addedBlog = await blogService.get(addedBlog.id)
    setBlogs(blogs.concat(addedBlog))
    resetTitle()
    resetAuthor()
    resetUrl()
    setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
    setType('success')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm