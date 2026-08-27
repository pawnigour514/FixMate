import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function MyJobs() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem('technicianJobs')
    ) || []

    setJobs(saved)
  }, [])

  function updateJob(id, status) {
    const updated = jobs.map((job) =>
      job.id === id ? { ...job, status } : job
    )

    setJobs(updated)

    localStorage.setItem(
      'technicianJobs',
      JSON.stringify(updated)
    )
  }

  return (
    <div className="page">

      <div className="page-header">
        <h1>My Jobs</h1>
        <p>Track your accepted and ongoing jobs.</p>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <h2>No Jobs Yet</h2>
          <p>Accept a service request to see it here.</p>
        </div>
      ) : (
        <div className="request-list">

          {jobs.map((job) => (
            <div className="request-card" key={job.id}>

              <div className="request-top">
                <div>
                  <h2>{job.title}</h2>
                  <p>{job.description}</p>
                </div>

                <span className={`status ${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
              </div>

              <div className="request-details">
                <p>
                  <strong>Customer:</strong> {job.customer}
                </p>

                <p>
                  <strong>Location:</strong> {job.location}
                </p>
              </div>

              <div className="request-actions">

                {job.status === 'Accepted' && (
                  <button
                    className="accept-button"
                    onClick={() => updateJob(job.id, 'Ongoing')}
                  >
                    Start Job
                  </button>
                )}

                {job.status === 'Ongoing' && (
                  <button
                    className="complete-button"
                    onClick={() => updateJob(job.id, 'Completed')}
                  >
                    Mark as Completed
                  </button>
                )}

                {job.status === 'Completed' && (
                  <p>✓ Job completed</p>
                )}

                <Link
                  to={`/job/${job.id}`}
                  className="card-button"
                >
                  View Details
                </Link>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default MyJobs