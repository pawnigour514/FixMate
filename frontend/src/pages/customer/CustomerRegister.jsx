import { useState } from 'react'

function CustomerRegister({ onRegister, onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    onRegister({
      name,
      email,
      password,
    })
  }

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* Brand */}

        <div className="auth-brand">

          <span className="brand-mark">
            F
          </span>

          <span className="brand-name">
            FixMate
          </span>

        </div>


        {/* Card */}

        <div className="auth-card">

          <div className="auth-header">

            <p className="auth-eyebrow">
              CUSTOMER ACCOUNT
            </p>

            <h1>
              Create your account
            </h1>

            <p>
              Get started with FixMate.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="register-email">
                Email
              </label>

              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="register-password">
                Password
              </label>

              <input
                id="register-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                required
              />

            </div>


            <button
              type="submit"
              className="auth-button"
            >
              Create Account
              <span>→</span>
            </button>

          </form>


          <div className="auth-footer">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              className="auth-link-button"
              onClick={onLogin}
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default CustomerRegister