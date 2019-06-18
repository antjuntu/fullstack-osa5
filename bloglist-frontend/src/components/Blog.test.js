import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Testiblogin otsikko',
      author: 'Teppo Testaaja',
      url: 'www.test.com',
      likes: 7,
      user: {
        username: 'test'
      }
    }

    const mockHandler1 = jest.fn()
    const mockHandler2 = jest.fn()

    const loggedUser = {
      username: 'test'
    }

    component = render(
      <Blog blog={blog} handleLikesUpdate={mockHandler1} handleBlogRemove={mockHandler2} loggedUser={loggedUser} />
    )
  })

  test('at start only title and author are displayed', () => {
    const titleRowDiv = component.container.querySelector('.titleRow')
    expect(titleRowDiv).toBeVisible()

    const detailsDiv = component.container.querySelector('.details')
    expect(detailsDiv).not.toBeVisible()
  })

  test('after clicking titleRow details are displayed', () => {
    const titleRowDiv = component.container.querySelector('.titleRow')
    fireEvent.click(titleRowDiv)

    const detailsDiv = component.container.querySelector('.details')
    expect(detailsDiv).toBeVisible()
  })
})