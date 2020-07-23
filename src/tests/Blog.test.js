import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let component
  let upvoteBlog
  let removeBlog

  const blog = {
    title: 'ramona',
    author: 'quimby',
    likes: 15,
    url: 'www.rq.com',
    user: {
      name: 'jon'
    }
  }

  beforeEach(() => {
    upvoteBlog = jest.fn()
    removeBlog = jest.fn()

    component = render(
      <Blog blog={blog} upvoteBlog={upvoteBlog} removeBlog={removeBlog} />
    )
  })
  test('initally renders blogs title and author but not url and likes', () => {
    const div = component.container.querySelector('.initialState')

    expect(div).toBeTruthy()
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.likes)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.user.name)
    expect(component.container.querySelector('.expandedState')).toBeNull()
  })

  test('when the view button is clicked the url, likes and user\'s name is displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const expandedDiv = component.container.querySelector('.expandedState')
    expect(expandedDiv).toBeTruthy()
    expect(expandedDiv).toHaveTextContent(blog.title)
    expect(expandedDiv).toHaveTextContent(blog.author)
    expect(expandedDiv).toHaveTextContent(blog.likes)
    expect(expandedDiv).toHaveTextContent(blog.url)
    expect(expandedDiv).toHaveTextContent(blog.user.name)
    expect(component.container.querySelector('.initialState')).toBeNull()
  })

  test('when the like button is clicked twice, the upvoteBlog method gets called twice', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(upvoteBlog.mock.calls).toHaveLength(2)
  })

  test('when the remove botton is clicked twice, it\'s handle method gets called twice', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const removeButton = component.getByText('remove')
    window.confirm = jest.fn(() => true)
    fireEvent.click(removeButton)
    fireEvent.click(removeButton)

    expect(removeBlog.mock.calls).toHaveLength(2)
  })

  test('when the hide button is clicked only the author and title show', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const hideButton = component.getByText('hide')
    fireEvent.click(hideButton)

    const div = component.container.querySelector('.initialState')

    expect(div).toBeTruthy()
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.likes)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.user.name)
    expect(component.container.querySelector('.expandedState')).toBeNull()
  })
})