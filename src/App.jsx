import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TechnicianLayout from './pages/technician/TechnicianLayout'
import TechnicianDashboard from './pages/technician/TechnicianDashboard'
import ServiceRequests from './pages/technician/ServiceRequests'
import MyJobs from './pages/technician/MyJobs'
import Profile from './pages/technician/Profile'
import JobDetails from './pages/technician/JobDetails'
import TechnicianLogin from './pages/technician/TechnicianLogin'
import ProtectedRoute from './pages/technician/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Technician Login */}
        <Route
          path="/login"
          element={<TechnicianLogin />}
        />

        {/* Protected Technician Panel */}
        <Route element={<ProtectedRoute />}>

          <Route element={<TechnicianLayout />}>

            {/* Dashboard */}
            <Route
              path="/"
              element={<TechnicianDashboard />}
            />

            {/* Service Requests */}
            <Route
              path="/service-requests"
              element={<ServiceRequests />}
            />

            {/* My Jobs */}
            <Route
              path="/my-jobs"
              element={<MyJobs />}
            />

            {/* Profile */}
            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* Job Details */}
            <Route
              path="/job/:id"
              element={<JobDetails />}
            />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App