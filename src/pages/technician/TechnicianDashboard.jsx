import { Link } from 'react-router-dom'

function TechnicianDashboard() {
  const jobs =
    JSON.parse(localStorage.getItem('technicianJobs')) || []

  const profile =
    JSON.parse(localStorage.getItem('technicianProfile')) || {
      name: 'Rahul Sharma',
      service: 'AC Repair',
      isOnline: true,
    }

    const requests =
    JSON.parse(
      localStorage.getItem('serviceRequests')
    ) || []
  
  const pendingRequests = requests.length

  const activeJobs = jobs.filter(
    (job) =>
      job.status === 'Accepted' ||
      job.status === 'Ongoing'
  ).length

  const completedJobs = jobs.filter(
    (job) => job.status === 'Completed'
  ).length

  const rating = 4.8

  return (
    <>
      {/* Top Header */}
      <div className="top-header">

        <div>
          <h1>Technician Dashboard</h1>

          <p>
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <div className="technician-info">

          <span className="notification">
            🔔
          </span>

          <div>
            <strong>{profile.name}</strong>

            <p>
              {profile.service} Technician
            </p>

            <span
              className={
                profile.isOnline
                  ? 'online'
                  : 'offline'
              }
            >
              ● {profile.isOnline ? 'Online' : 'Offline'}
            </span>

          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="stats">

        <div className="stat-card">
          <p>Pending Requests</p>
          <h2>{pendingRequests}</h2>
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
          <h2>{rating} ⭐</h2>
        </div>

      </div>

      {/* Recent Jobs */}
      <div className="recent-jobs">

        <div className="section-header">

          <div>
            <h2>Recent Jobs</h2>
            <p>
              Your latest accepted and completed jobs.
            </p>
          </div>

          <Link
            to="/my-jobs"
            className="view-all"
          >
            View All
          </Link>

        </div>

        {jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No Jobs Yet</h3>

            <p>
              Accepted jobs will appear here.
            </p>
          </div>
        ) : (

          <div className="job-table">

            {jobs
              .slice(-5)
              .reverse()
              .map((job) => (

                <div
                  className="job-row"
                  key={job.id}
                >

                  <div>
                    <strong>
                      {job.title}
                    </strong>

                    <p>
                      {job.customer}
                    </p>
                  </div>

                  <div>
                    <p>
                      {job.location}
                    </p>
                  </div>

                  <span
                    className={`status ${job.status.toLowerCase()}`}
                  >
                    {job.status}
                  </span>

                  <Link
                    to={`/job/${job.id}`}
                    className="details-button"
                  >
                    Details
                  </Link>

                </div>

              ))}

          </div>

        )}

      </div>

      {/* Dashboard Cards */}
      <div className="cards">

        <div className="card">
          <h3>Service Requests</h3>

          <p>
            View and manage new customer requests.
          </p>

          <Link
            to="/service-requests"
            className="card-button"
          >
            View Requests
          </Link>
        </div>

        <div className="card">
          <h3>My Jobs</h3>

          <p>
            Track your accepted and ongoing jobs.
          </p>

          <Link
            to="/my-jobs"
            className="card-button"
          >
            View Jobs
          </Link>
        </div>

        <div className="card">
          <h3>Profile</h3>

          <p>
            Manage your technician information.
          </p>

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