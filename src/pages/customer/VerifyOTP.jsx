import { useState } from 'react'

function VerifyOTP({
  email,
  onVerify,
  onBack,
}) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [resendMessage, setResendMessage] = useState('')

  // Temporary mock OTP
  const MOCK_OTP = '123456'

  const handleChange = (event) => {
    const value = event.target.value

    if (/^\d{0,6}$/.test(value)) {
      setOtp(value)
      setError('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (otp.length !== 6) {
      setError('Enter the 6-digit OTP.')
      return
    }

    if (otp !== MOCK_OTP) {
      setError('Invalid OTP. Try again.')
      return
    }

    onVerify()
  }

  const handleResend = () => {
    setOtp('')
    setError('')
    setResendMessage('A new OTP has been sent.')
  }

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-brand">

          <span className="brand-mark">
            F
          </span>

          <span className="brand-name">
            FixMate
          </span>

        </div>


        <div className="auth-card">

          <div className="auth-header">

            <p className="auth-eyebrow">
              EMAIL VERIFICATION
            </p>

            <h1>
              Verify your email
            </h1>

            <p>
              Enter the 6-digit code sent to
              <br />
              <strong>{email}</strong>
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="otp">
                Verification code
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength="6"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={handleChange}
                required
              />

            </div>


            {error && (
              <p className="otp-error">
                {error}
              </p>
            )}


            {resendMessage && (
              <p className="otp-success">
                {resendMessage}
              </p>
            )}


            <button
              type="submit"
              className="auth-button"
            >
              Verify Email
              <span>→</span>
            </button>

          </form>


          <div className="otp-resend">

            <span>
              Didn't receive it?
            </span>

            <button
              type="button"
              className="auth-link-button"
              onClick={handleResend}
            >
              Resend OTP
            </button>

          </div>


          <button
            type="button"
            className="otp-back-button"
            onClick={onBack}
          >
            ← Back to registration
          </button>

        </div>

      </div>

    </div>
  )
}

export default VerifyOTP