import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
  let component
  let createBlog

  beforeEach(() => {
    createBlog = jest.fn()
    component = render(
      <BlogForm createBlog={createBlog} />
    )
  })

  test('form calls the event handler on submit with the correct information', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'test blog' }
    })
    fireEvent.change(author, {
      target: { value: 'test author' }
    })
    fireEvent.change(url, {
      target: { value: 'test url' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test blog')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('test url')
  })
})