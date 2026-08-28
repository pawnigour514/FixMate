function ServiceRequestDetails({ request, onBack }) {
  if (!request) {
    return (
      <div className="request-details-page">
        <div className="request-details-container">

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>

          <div className="request-details-card empty-details-card">
            <h1>Request not found</h1>

            <p>
              This request is no longer available.
            </p>
          </div>

        </div>
      </div>
    )
  }

  const statusSteps = [
    {
      status: 'Pending',
      title: 'Request submitted',
    },
    {
      status: 'Accepted',
      title: 'Technician assigned',
    },
    {
      status: 'In Progress',
      title: 'Service in progress',
    },
    {
      status: 'Completed',
      title: 'Completed',
    },
  ]

  const statusOrder = [
    'Pending',
    'Accepted',
    'In Progress',
    'Completed',
  ]

  const currentStatusIndex =
    statusOrder.indexOf(request.status)

  const formattedDate = request.createdAt
    ? new Date(request.createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Not available'

  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'status-accepted'

      case 'In Progress':
        return 'status-progress'

      case 'Completed':
        return 'status-completed'

      case 'Rejected':
        return 'status-rejected'

      default:
        return 'status-pending'
    }
  }

  const serviceName =
    request.category
      ?.split('-')
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ') || 'Service Request'

  return (
    <div className="request-details-page">

      <div className="request-details-container">

        {/* Back */}

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to Requests
        </button>


        {/* Main Card */}

        <div className="request-details-card">

          {/* Header */}

          <div className="request-details-header">

            <div>

              <p className="request-label">
                SERVICE REQUEST
              </p>

              <h1>
                {serviceName}
              </h1>

            </div>

            <span
              className={`request-status ${getStatusClass(
                request.status
              )}`}
            >
              {request.status}
            </span>

          </div>


          {/* Request information */}

          <div className="request-meta-grid">

            <div className="request-meta-item">

              <span>
                Request ID
              </span>

              <strong>
                {request.id || 'FM-0001'}
              </strong>

            </div>


            <div className="request-meta-item">

              <span>
                Submitted
              </span>

              <strong>
                {formattedDate}
              </strong>

            </div>

          </div>


          {/* Problem */}

          <div className="details-section">

            <h3>
              Problem
            </h3>

            <div className="details-content">

              <p>
                {request.description ||
                  'No description provided.'}
              </p>

            </div>

          </div>


          {/* Location */}

          <div className="details-section">

            <h3>
              Location
            </h3>

            <div className="details-content">

              <p>
                {request.location ||
                  'Location not provided.'}
              </p>

            </div>

          </div>


          {/* Attachment */}

          {request.file && (
            <div className="details-section">

              <h3>
                Attachment
              </h3>

              <div className="details-content">

                <p className="attachment-name">
                  {request.file.name}
                </p>

              </div>

            </div>
          )}


          {/* Status */}

          <div className="details-section">

            <h3>
              Status
            </h3>

            {request.status === 'Rejected' ? (

              <div className="rejected-message">

                <div className="rejected-icon">
                  ×
                </div>

                <div>

                  <strong>
                    Request rejected
                  </strong>

                  <p>
                    This request was not accepted.
                  </p>

                </div>

              </div>

            ) : (

              <div className="status-timeline">

                {statusSteps.map((step, index) => {

                  const isActive =
                    index <= currentStatusIndex

                  const isCurrent =
                    index === currentStatusIndex

                  return (
                    <div
                      className={`timeline-item ${
                        isActive ? 'active' : ''
                      } ${
                        isCurrent ? 'current' : ''
                      }`}
                      key={step.status}
                    >

                      <div className="timeline-dot">

                        {isActive
                          ? '✓'
                          : index + 1}

                      </div>

                      <div className="timeline-content">

                        <strong>
                          {step.title}
                        </strong>

                        {isCurrent && (
                          <span className="timeline-current">
                            Current
                          </span>
                        )}

                      </div>

                    </div>
                  )
                })}

              </div>

            )}

          </div>


          {/* Current status */}

          <div className="current-status-message">

            <span>
              Current status
            </span>

            <strong>
              {request.status}
            </strong>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ServiceRequestDetails