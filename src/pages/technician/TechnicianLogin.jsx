import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

function TechnicianLogin() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const isLoggedIn =
    localStorage.getItem('technicianLoggedIn') === 'true'

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  function handleLogin(e) {
    e.preventDefault()

    if (phone === '9876543210' && password === '123456') {
      localStorage.setItem('technicianLoggedIn', 'true')

      navigate('/')
    } else {
      alert('Invalid phone number or password')
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>FixMate</h1>

        <h2>Technician Login</h2>

        <p>
          Login to access your technician dashboard.
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default TechnicianLogin