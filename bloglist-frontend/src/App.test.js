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
})