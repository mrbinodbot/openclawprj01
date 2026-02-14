import { render, screen, fireEvent } from '@testing-library/react'
import TodoApp from './TodoApp'

test('add and toggle todo', () => {
  render(<TodoApp />)
  const input = screen.getByPlaceholderText(/what needs doing/i)
  fireEvent.change(input, { target: { value: 'Buy milk' } })
  fireEvent.submit(input)
  expect(screen.getByText('Buy milk')).toBeInTheDocument()
})
