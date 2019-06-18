import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikesUpdate, handleBlogRemove, loggedUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detailsStyle = { display: showDetails ? '' : 'none' }

  const removeButtonStyle= { display: loggedUser.username === blog.user.username ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div onClick={() => setShowDetails(!showDetails)} className="titleRow">
        {blog.title} {blog.author}
      </div>
      <div style={detailsStyle} className="details">
        <div><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></div>
        <div>{blog.likes} likes &nbsp;<button onClick={handleLikesUpdate}>like</button></div>
        <div>added by {blog.user.name}</div>
        <div style={removeButtonStyle}>
          <button onClick={handleBlogRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikesUpdate: PropTypes.func.isRequired,
  handleBlogRemove: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired
}

export default Blog