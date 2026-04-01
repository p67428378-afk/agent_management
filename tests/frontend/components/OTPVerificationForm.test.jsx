import { render, screen } from '@testing-library/react'
import OTPVerificationForm from '../OTPVerificationForm'

describe('OTPVerificationForm', () => {
  it('should render the OTP verification form', () => {
    render(<OTPVerificationForm />)
    expect(screen.getByRole('heading', { name: /Verify Identity/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/OTP Code/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Verify Code/i })).toBeInTheDocument()
  })
})
