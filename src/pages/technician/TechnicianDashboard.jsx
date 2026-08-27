import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function TechnicianDashboard() {
  const [jobs, setJobs] = useState([])
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const loadData = () => {
      setJobs(
        JSON.parse(localStorage.getItem('technicianJobs')) || []
      )

      setRequests(
        JSON.parse(localStorage.getItem('serviceRequests')) || []
      )
    }

    loadData()

    window.addEventListener('storage', loadData)

    return () =>
      window.removeEventListener('storage', loadData)
  }, [])

  const activeJobs = jobs.filter(
    (job) =>
      job.status === 'Accepted' ||
      job.status === 'Ongoing'
  ).length

  const completedJobs = jobs.filter(
    (job) => job.status === 'Completed'
  ).length

  return (
    <>
      <div className="top-header">
        <div>
          <h1>Technician Dashboard</h1>
          <p>Welcome back! Here's what's happening today.</p>
        </div>

        <div className="technician-info">
          <span className="notification">🔔</span>

          <div>
            <strong>Rahul Sharma</strong>
            <p>Technician</p>
          </div>
        </div>
      </div>

      <div className="stats">

        <div className="stat-card">
          <p>Pending Requests</p>
          <h2>{requests.length}</h2>
        </div>

        <div className="stat-card">
          <p>Active Jobs</p>
          <h2>{activeJobs}</h2>
        </div>

        <div className="stat-card">
          <p>Completed Jobs</p>
          <h2>{completedJobs}</h2>
        </div>

        <div className="stat-card">
          <p>Rating</p>
          <h2>4.8 ⭐</h2>
        </div>

      </div>

      <div className="cards">

        <div className="card">
          <h3>Service Requests</h3>
          <p>View and manage new customer requests.</p>

          <Link
            to="/service-requests"
            className="card-button"
          >
            View Requests
          </Link>
        </div>

        <div className="card">
          <h3>My Jobs</h3>
          <p>Track your accepted and ongoing jobs.</p>

          <Link
            to="/my-jobs"
            className="card-button"
          >
            View Jobs
          </Link>
        </div>

        <div className="card">
          <h3>Profile</h3>
          <p>Manage your technician information.</p>

          <Link
            to="/profile"
            className="card-button"
          >
            View Profile
          </Link>
        </div>

      </div>
    </>
  )
}

export default TechnicianDashboard