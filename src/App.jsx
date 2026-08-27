
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TechnicianLayout from './pages/technician/TechnicianLayout'
import TechnicianDashboard from './pages/technician/TechnicianDashboard'
import ServiceRequests from './pages/technician/ServiceRequests'
import MyJobs from './pages/technician/MyJobs'
import Profile from './pages/technician/Profile'
import JobDetails from './pages/technician/JobDetails'
import TechnicianLogin from './pages/technician/TechnicianLogin'
import TechnicianVerification from './pages/technician/TechnicianVerification'
import ProtectedRoute from './pages/technician/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<TechnicianLogin />}
        />

        <Route element={<ProtectedRoute />}>

          <Route element={<TechnicianLayout />}>

            <Route
              path="/"
              element={<TechnicianDashboard />}
            />

            <Route
              path="/service-requests"
              element={<ServiceRequests />}
            />

            <Route
              path="/my-jobs"
              element={<MyJobs />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/verification"
              element={<TechnicianVerification />}
            />

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

