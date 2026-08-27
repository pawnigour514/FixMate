import { useState } from 'react'
import { Link } from 'react-router-dom'

function MyJobs() {
  const [jobs, setJobs] = useState(
    JSON.parse(localStorage.getItem('technicianJobs')) || []
  )

  function startJob(id) {
    const updatedJobs = jobs.map((job) =>
      job.id === id
        ? { ...job, status: 'Ongoing' }
        : job
    )

    setJobs(updatedJobs)

    localStorage.setItem(
      'technicianJobs',
      JSON.stringify(updatedJobs)
    )
  }

  function completeJob(id) {
    const updatedJobs = jobs.map((job) =>
      job.id === id
        ? { ...job, status: 'Completed' }
        : job
    )

    setJobs(updatedJobs)

    localStorage.setItem(
      'technicianJobs',
      JSON.stringify(updatedJobs)
    )
  }

  return (
    <div className="page">

      {/* Page Header */}
      <div className="page-header">
        <h1>My Jobs</h1>
        <p>
          Track your accepted and ongoing jobs.
        </p>
      </div>

      {/* No Jobs */}
      {jobs.length === 0 ? (
        <div className="empty-state">
          <h2>No Jobs Yet</h2>
          <p>
            Accept a service request to see it here.
          </p>
        </div>
      ) : (

        <div className="request-list">

          {jobs.map((job) => (

            <div
              className="request-card"
              key={job.id}
            >

              {/* Job Header */}
              <div className="request-top">

                <div>
                  <h2>{job.title}</h2>

                  <p>
                    {job.description}
                  </p>
                </div>

                <span
                  className={`status ${job.status.toLowerCase()}`}
                >
                  {job.status}
                </span>

              </div>

              {/* Job Details */}
              <div className="request-details">

                <p>
                  <strong>Customer:</strong>{' '}
                  {job.customer}
                </p>

                <p>
                  <strong>Location:</strong>{' '}
                  {job.location}
                </p>

              </div>

              {/* Actions */}
              <div className="request-actions">

                {job.status === 'Accepted' && (
                  <button
                    className="accept-button"
                    onClick={() => startJob(job.id)}
                  >
                    Start Job
                  </button>
                )}

                {job.status === 'Ongoing' && (
                  <button
                    className="accept-button"
                    onClick={() =>
                      completeJob(job.id)
                    }
                  >
                    Mark as Completed
                  </button>
                )}

                {job.status === 'Completed' && (
                  <p>
                    ✓ Job completed
                  </p>
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