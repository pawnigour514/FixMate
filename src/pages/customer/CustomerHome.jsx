function CustomerHome({
  onBookService,
  onProfile,
  onViewRequest,
  requests,
  onDeleteRequest,
  customer,
}) {
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

  const formatDate = (date) => {
    if (!date) {
      return 'Just now'
    }

    return new Date(date).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  const handleServiceClick = (service) => {
    onBookService(service)
  }

  return (
    <div className="customer-home">

      {/* Navigation */}
      <header className="customer-header">

        <div className="brand">
          <span className="brand-mark">
            F
          </span>

          <span className="brand-name">
            FixMate
          </span>
        </div>

        <button
          type="button"
          className="profile-button"
          onClick={onProfile}
        >
          <span className="profile-icon">
            {customer?.name?.charAt(0).toUpperCase() || 'R'}
          </span>

          <span>Profile</span>
        </button>

      </header>


      <main className="customer-content">

        {/* Hero */}
        <section className="welcome-section">

          <div className="welcome-content">

            <p className="welcome-eyebrow">
              HOME SERVICES, SIMPLIFIED
            </p>

            <h1>
              What can we help
              <br />
              you fix today?
            </h1>

            <p className="welcome-description">
              Book reliable professionals for repairs,
              maintenance and everyday home services.
            </p>

            <button
              type="button"
              className="book-service-button"
              onClick={() => handleServiceClick('')}
            >
              Book a Service
              <span>→</span>
            </button>

          </div>

          <div className="welcome-decoration">
            <div className="decoration-circle large" />
            <div className="decoration-circle small" />
          </div>

        </section>


        {/* Services */}
        <section className="services-section">

          <div className="section-heading">

            <div>
              <p className="section-eyebrow">
                OUR SERVICES
              </p>

              <h2>
                Popular services
              </h2>
            </div>

            <button
              type="button"
              className="view-all-button"
              onClick={() => handleServiceClick('')}
            >
              View all →
            </button>

          </div>


          <div className="service-grid">

            <button
              type="button"
              className="service-card-button"
              onClick={() =>
                handleServiceClick('plumbing')
              }
            >
              <span className="service-icon">
                🔧
              </span>

              <span className="service-name">
                Plumbing
              </span>

              <span className="service-description">
                Pipes &amp; leaks
              </span>
            </button>


            <button
              type="button"
              className="service-card-button"
              onClick={() =>
                handleServiceClick('electrical')
              }
            >
              <span className="service-icon">
                ⚡
              </span>

              <span className="service-name">
                Electrical
              </span>

              <span className="service-description">
                Wiring &amp; power
              </span>
            </button>


            <button
              type="button"
              className="service-card-button"
              onClick={() =>
                handleServiceClick('ac-repair')
              }
            >
              <span className="service-icon">
                ❄️
              </span>

              <span className="service-name">
                AC Repair
              </span>

              <span className="service-description">
                Cooling &amp; service
              </span>
            </button>


            <button
              type="button"
              className="service-card-button"
              onClick={() =>
                handleServiceClick('appliance-repair')
              }
            >
              <span className="service-icon">
                🔌
              </span>

              <span className="service-name">
                Appliances
              </span>

              <span className="service-description">
                Repair &amp; maintenance
              </span>
            </button>


            <button
              type="button"
              className="service-card-button"
              onClick={() =>
                handleServiceClick('carpentry')
              }
            >
              <span className="service-icon">
                🪚
              </span>

              <span className="service-name">
                Carpentry
              </span>

              <span className="service-description">
                Furniture &amp; woodwork
              </span>
            </button>

          </div>

        </section>


        {/* Requests */}
        <section className="requests-section">

          <div className="section-heading">

            <div>
              <p className="section-eyebrow">
                YOUR ACTIVITY
              </p>

              <h2>
                Recent requests
              </h2>
            </div>

            {requests.length > 0 && (
              <span className="request-count">
                {requests.length}{' '}
                {requests.length === 1
                  ? 'request'
                  : 'requests'}
              </span>
            )}

          </div>


          {requests.length === 0 ? (

            <div className="empty-requests">

              <div className="empty-icon">
                +
              </div>

              <h3>
                No service requests yet
              </h3>

              <p>
                When you need help around your home,
                your requests will appear here.
              </p>

              <button
                type="button"
                className="empty-request-button"
                onClick={() =>
                  handleServiceClick('')
                }
              >
                Create your first request
                <span>→</span>
              </button>

            </div>

          ) : (

            <div className="request-list">

              {requests.map((request, index) => (

                <article
                  className="request-card"
                  key={request.id || index}
                  onClick={() =>
                    onViewRequest(request)
                  }
                  role="button"
                  tabIndex="0"
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Enter' ||
                      event.key === ' '
                    ) {
                      event.preventDefault()
                      onViewRequest(request)
                    }
                  }}
                >

                  <div className="request-card-top">

                    <div>
                      <p className="request-type">
                        SERVICE REQUEST
                      </p>

                      <h3>
                        {request.category
                          ?.split('-')
                          .map(
                            (word) =>
                              word
                                .charAt(0)
                                .toUpperCase() +
                              word.slice(1)
                          )
                          .join(' ')}
                      </h3>
                    </div>

                    <span
                      className={`request-status ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>

                  </div>


                  <div className="request-info">

                    <span className="request-info-label">
                      Problem
                    </span>

                    <p>
                      {request.description}
                    </p>

                  </div>


                  <div className="request-location">

                    <span>
                      📍
                    </span>

                    <p>
                      {request.location}
                    </p>

                  </div>


                  <div className="request-footer">

                    <span>
                      {formatDate(request.createdAt)}
                    </span>

                    <div className="request-actions">

                      <span className="view-request">
                        View details →
                      </span>

                      <button
                        type="button"
                        className="delete-request-button"
                        onClick={(event) => {
                          event.stopPropagation()
                          onDeleteRequest(index)
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  )
}

export default CustomerHome