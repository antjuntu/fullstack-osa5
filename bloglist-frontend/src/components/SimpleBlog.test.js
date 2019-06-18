import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'


test('renders the blogs title, author and likes', () => {
  const blog = {
    title: 'Testiblogin otsikko',
    author: 'Teppo Testaaja',
    likes: 7
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const titleDiv = component.container.querySelector('.titleAndAuthor')
  expect(titleDiv).toHaveTextContent(
    'Testiblogin otsikko'
  )
  expect(titleDiv).toHaveTextContent(
    'Teppo Testaaja'
  )

  const likesDiv = component.container.querySelector('.likes')
  expect(likesDiv).toHaveTextContent(
    'blog has 7 likes'
  )
})