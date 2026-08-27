import { Outlet, useNavigate, Link } from 'react-router-dom'

function TechnicianLayout() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('technicianLoggedIn')
    navigate('/login')
  }

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>FixMate</h2>

        <nav>
          <Link to="/">Dashboard</Link>

          <Link to="/service-requests">
            Service Requests
          </Link>

          <Link to="/my-jobs">
            My Jobs
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <Link to="/verification">
            Verification
          </Link>
        </nav>

        <button
          className="logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

    </div>
  )
}

export default TechnicianLayout

