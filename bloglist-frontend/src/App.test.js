import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user is logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    const loginForm = await waitForElement(
      () => component.container.querySelector('.loginForm')
    )
    expect(loginForm).toBeVisible()

    const blogsTitle = component.queryByText('blogs')
    expect(blogsTitle).toBeNull()
  })

  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'test',
      token: '6183950572852562586292',
      name: 'Teppo Testaaja'
    }
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(3)
  })
})