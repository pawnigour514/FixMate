function ServiceRequestDetails({ request, onBack }) {
  const statusSteps = [
    {
      status: 'Pending',
      title: 'Request Submitted',
      description: 'Your request has been submitted.',
    },
    {
      status: 'Accepted',
      title: 'Technician Assigned',
      description: 'A technician has accepted your request.',
    },
    {
      status: 'In Progress',
      title: 'Service In Progress',
      description: 'The technician is working on your request.',
    },
    {
      status: 'Completed',
      title: 'Completed',
      description: 'Your service has been completed.',
    },
  ]

  const statusOrder = [
    'Pending',
    'Accepted',
    'In Progress',
    'Completed',
  ]

  const currentStatusIndex = statusOrder.indexOf(request.status)

  const formattedDate = request.createdAt
    ? new Date(request.createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Not available'

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
              <p className="request-label">
                Service Request
              </p>

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

          <div className="request-id-section">
            <span>Request ID</span>

            <strong>
              {request.id || 'FM-0001'}
            </strong>
          </div>

          <div className="request-date-section">
            <span>Submitted</span>

            <strong>
              {formattedDate}
            </strong>
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

              {statusSteps.map((step, index) => {

                const isActive =
                  index <= currentStatusIndex

                return (
                  <div
                    className={`timeline-item ${
                      isActive ? 'active' : ''
                    }`}
                    key={step.status}
                  >

                    <div className="timeline-dot">
                      {isActive ? '✓' : index + 1}
                    </div>

                    <div>
                      <strong>
                        {step.title}
                      </strong>

                      <p>
                        {step.description}
                      </p>
                    </div>

                  </div>
                )
              })}

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default ServiceRequestDetails