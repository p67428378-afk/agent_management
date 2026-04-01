import { render, screen } from '@testing-library/react'
import LoginForm from '../LoginForm'

describe('LoginForm', () => {
  it('should render the login form', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Security Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Authenticate Profile/i })).toBeInTheDocument()
  })
})
