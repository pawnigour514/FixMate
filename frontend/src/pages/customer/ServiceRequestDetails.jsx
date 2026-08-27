function ServiceRequestDetails({ request, onBack }) {
  return (
    <div className="request-details-page">
      <div className="request-details-container">

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to Requests
        </button>

        <div className="request-details-card">

          <div className="request-details-header">
            <div>
              <p className="request-label">Service Request</p>

              <h1>
                {request.category.charAt(0).toUpperCase() +
                  request.category.slice(1)}
              </h1>
            </div>

            <span
              className={`request-status ${
                request.status === 'Accepted'
                  ? 'status-accepted'
                  : request.status === 'In Progress'
                  ? 'status-progress'
                  : request.status === 'Completed'
                  ? 'status-completed'
                  : request.status === 'Rejected'
                  ? 'status-rejected'
                  : 'status-pending'
              }`}
            >
              {request.status}
            </span>
          </div>

          <div className="details-section">
            <h3>Problem</h3>

            <p>
              {request.description}
            </p>
          </div>

          <div className="details-section">
            <h3>
  <span className="location-icon">●</span>
  Location
</h3>

            <p>
              {request.location}
            </p>
          </div>

          <div className="details-section">
            <h3>Request Status</h3>

            <div className="status-timeline">

              <div className="timeline-item active">
                <div className="timeline-dot">
                  ✓
                </div>

                <div>
                  <strong>Request Submitted</strong>
                  <p>Your request has been submitted.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">
                  2
                </div>

                <div>
                  <strong>Technician Assigned</strong>
                  <p>Waiting for a technician.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">
                  3
                </div>

                <div>
                  <strong>Service In Progress</strong>
                  <p>The technician will work on your request.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">
                  4
                </div>

                <div>
                  <strong>Completed</strong>
                  <p>Your service will be marked completed.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ServiceRequestDetails