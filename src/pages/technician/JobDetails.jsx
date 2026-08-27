import { useParams, Link } from 'react-router-dom'

function JobDetails() {
  const { id } = useParams()

  const jobs =
    JSON.parse(localStorage.getItem('technicianJobs')) || []

  const job = jobs.find(
    (item) => String(item.id) === String(id)
  )

  if (!job) {
    return (
      <div className="page">
        <h1>Job Not Found</h1>
        <p>This job does not exist.</p>
        <Link to="/my-jobs" className="card-button">
          Back to My Jobs
        </Link>
      </div>
    )
  }

  const phone = job.phone || 'Not provided'
  const location = job.address || job.location || 'Not provided'
  const charge = job.charge || 0

  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(location)

  return (
    <div className="page">

      <div className="page-header">
        <h1>Job Details</h1>
        <p>Complete customer and service information.</p>
      </div>

      <div className="profile-card">

        <h2>Customer Information</h2>

        <div className="request-details">

          <p>
            <strong>Customer:</strong> {job.customer}
          </p>

          <p>
            <strong>Phone:</strong> {phone}
          </p>

          <p>
            <strong>Location:</strong> {location}
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="card-button"
          >
            📍 Open in Google Maps
          </a>

        </div>

        <h2>Service Information</h2>

        <div className="request-details">

          <p>
            <strong>Service:</strong> {job.title}
          </p>

          <p>
            <strong>Description:</strong>{' '}
            {job.description}
          </p>

          <p>
            <strong>Your Charge:</strong> ₹{charge}
          </p>

        </div>

        <h2>Job Status</h2>

        <div className="request-details">

          <p>
            <strong>Current Status:</strong>{' '}
            {job.status}
          </p>

        </div>

        <Link
          to="/my-jobs"
          className="card-button"
        >
          ← Back to My Jobs
        </Link>

      </div>

    </div>
  )
}

export default JobDetails

