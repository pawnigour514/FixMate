import { useState } from 'react'

function CustomerLogin({ onLogin, onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    onLogin({
      email,
      password,
    })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <h1>FixMate</h1>
          <p>Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?
          </p>

          <button
            type="button"
            className="auth-link-button"
            onClick={onRegister}
          >
            Create an account
          </button>
        </div>

      </div>
    </div>
  )
}

export default CustomerLogin