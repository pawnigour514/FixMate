import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
  const isLoggedIn =
    localStorage.getItem('technicianLoggedIn') === 'true'

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute