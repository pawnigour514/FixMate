import { useParams } from 'react-router-dom'

function JobDetails() {
  const { id } = useParams()

  const jobs =
    JSON.parse(localStorage.getItem('technicianJobs')) || []

  const job = jobs.find(
    (item) => item.id === Number(id)
  )

  if (!job) {
    return (
      <div className="page">
        <h1>Job Not Found</h1>
        <p>This job does not exist.</p>
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

        <br />

        <p>
          <strong>Customer:</strong> {job.customer}
        </p>

        <p>
          <strong>Location:</strong> {job.location}
        </p>

        <br />

        <h2>Service Information</h2>

        <br />

        <p>
          <strong>Service:</strong> {job.title}
        </p>

        <p>
          <strong>Description:</strong> {job.description}
        </p>

        <p>
          <strong>Status:</strong> {job.status}
        </p>

        <br />

        <a
          href="/my-jobs"
          className="card-button"
        >
          Back to My Jobs
        </a>

      </div>

    </div>
  )
}

export default JobDetails