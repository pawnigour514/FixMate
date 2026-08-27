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
            ← Back to Requests
          </button>

          <div className="request-details-card">
            <h1>Request Not Found</h1>

            <p>
              We could not find this service request.
            </p>
          </div>

        </div>
      </div>
    )
  }

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

  const currentStatusIndex = statusOrder.indexOf(
    request.status
  )

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

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to Requests
        </button>


        <div className="request-details-card">

          {/* Header */}
          <div className="request-details-header">

            <div>
              <p className="request-label">
                Service Request
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


          {/* Request Information */}
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
              📝 Problem
            </h3>

            <div className="details-content">
              <p>
                {request.description || 'No description provided.'}
              </p>
            </div>

          </div>


          {/* Location */}
          <div className="details-section">

            <h3>
              📍 Location
            </h3>

            <div className="details-content location-content">

              <span className="location-pin">
                📍
              </span>

              <p>
                {request.location || 'Location not provided.'}
              </p>

            </div>

          </div>


          {/* Uploaded File */}
          {request.file && (
            <div className="details-section">

              <h3>
                📎 Attachment
              </h3>

              <div className="details-content">

                <p>
                  {request.file.name}
                </p>

              </div>

            </div>
          )}


          {/* Status */}
          <div className="details-section">

            <h3>
              Request Status
            </h3>


            {request.status === 'Rejected' ? (

              <div className="rejected-message">

                <div className="rejected-icon">
                  ✕
                </div>

                <div>
                  <strong>
                    Request Rejected
                  </strong>

                  <p>
                    Unfortunately, this service request
                    was rejected.
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

                        <p>
                          {step.description}
                        </p>

                      </div>

                    </div>
                  )
                })}

              </div>

            )}

          </div>


          {/* Current Status Message */}
          <div className="current-status-message">

            <strong>
              Current Status
            </strong>

            <p>
              {request.status === 'Pending' &&
                'We are looking for a technician for your request.'}

              {request.status === 'Accepted' &&
                'A technician has accepted your request and will handle the service.'}

              {request.status === 'In Progress' &&
                'Your technician is currently working on the service.'}

              {request.status === 'Completed' &&
                'Your service request has been successfully completed.'}

              {request.status === 'Rejected' &&
                'Please create another request if you still need assistance.'}
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ServiceRequestDetails