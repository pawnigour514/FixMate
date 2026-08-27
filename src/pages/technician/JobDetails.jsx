import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function JobDetails() {
  const { id } = useParams()

  const [jobs, setJobs] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem('technicianJobs')
      ) || []
    )
  })

  const job = jobs.find(
    (item) => item.id === Number(id)
  )

  function updateJobStatus(newStatus) {
    const updatedJobs = jobs.map((item) =>
      item.id === Number(id)
        ? {
            ...item,
            status: newStatus,
          }
        : item
    )

    setJobs(updatedJobs)

    localStorage.setItem(
      'technicianJobs',
      JSON.stringify(updatedJobs)
    )
  }

  if (!job) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Job Not Found</h1>
          <p>This job does not exist.</p>
        </div>

        <Link
          to="/my-jobs"
          className="card-button"
        >
          Back to My Jobs
        </Link>
      </div>
    )
  }

  return (
    <div className="page">

      <div className="page-header">
        <h1>{job.title}</h1>
        <p>Job details and customer information.</p>
      </div>

      <div className="profile-card">

        <h2>Customer Information</h2>

        <div className="job-detail-section">
          <p>
            <strong>Customer:</strong>{' '}
            {job.customer}
          </p>

          <p>
            <strong>Location:</strong>{' '}
            {job.location}
          </p>
        </div>

        <h2>Service Information</h2>

        <div className="job-detail-section">
          <p>
            <strong>Service:</strong>{' '}
            {job.title}
          </p>

          <p>
            <strong>Description:</strong>{' '}
            {job.description}
          </p>
        </div>

        <h2>Job Status</h2>

        <div className="job-detail-section">
          <p>
            <strong>Current Status:</strong>{' '}
            <span
              className={`status ${job.status.toLowerCase()}`}
            >
              {job.status}
            </span>
          </p>
        </div>

        <div className="job-actions">

          {job.status === 'Accepted' && (
            <button
              className="accept-button"
              onClick={() =>
                updateJobStatus('Ongoing')
              }
            >
              Start Job
            </button>
          )}

          {job.status === 'Ongoing' && (
            <button
              className="complete-button"
              onClick={() =>
                updateJobStatus('Completed')
              }
            >
              Mark as Completed
            </button>
          )}

          {job.status === 'Completed' && (
            <p className="completed-message">
              ✓ This job has been completed.
            </p>
          )}

        </div>

        <br />

        <Link
          to="/my-jobs"
          className="card-button"
        >
          Back to My Jobs
        </Link>

      </div>

    </div>
  )
}

export default JobDetails