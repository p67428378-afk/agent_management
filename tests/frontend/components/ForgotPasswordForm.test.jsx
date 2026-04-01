import { render, screen } from '@testing-library/react'
import ForgotPasswordForm from '../ForgotPasswordForm'

describe('ForgotPasswordForm', () => {
  it('should render the forgot password form', () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByRole('heading', { name: /Reset Password/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Send OTP/i })).toBeInTheDocument()
  })
})
