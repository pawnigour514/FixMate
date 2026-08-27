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
      return 'Submitted just now'
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

      {/* Header */}
      <header className="customer-header">

        <h1>FixMate</h1>

        <button
          type="button"
          className="profile-button"
          onClick={onProfile}
        >
          👤 Profile
        </button>

      </header>


      {/* Main Content */}
      <main className="customer-content">

        {/* Welcome Section */}
        <section className="welcome-section">

          <h2>
            Hello, {customer?.name || 'Rohit'} 👋
          </h2>

          <p>
            What service do you need today?
          </p>

          <button
            type="button"
            className="book-service-button"
            onClick={() => handleServiceClick('')}
          >
            Book a Service
          </button>

        </section>


        {/* Popular Services */}
        <section className="services-section">

          <h2>
            Popular Services
          </h2>

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

              <span>
                Plumbing
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

              <span>
                Electrical
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

              <span>
                AC Repair
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

              <span>
                Appliance Repair
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

              <span>
                Carpentry
              </span>
            </button>

          </div>

        </section>


        {/* Recent Requests */}
        <section className="requests-section">

          <h2>
            My Recent Requests
          </h2>


          {requests.length === 0 ? (

            /* Empty State */
            <div className="empty-requests">

              <p>
                You don't have any service requests yet.
              </p>

              <button
                type="button"
                className="book-service-button"
                onClick={() =>
                  handleServiceClick('')
                }
              >
                Create Your First Request
              </button>

            </div>

          ) : (

            /* Request List */
            <div className="request-list">

              {requests.map((request, index) => (

                <div
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
                      onViewRequest(request)
                    }
                  }}
                >

                  {/* Request Header */}
                  <div className="request-card-top">

                    <h3>
                      {request.category
                        .charAt(0)
                        .toUpperCase() +
                        request.category.slice(1)}
                    </h3>

                    <span
                      className={`request-status ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>

                  </div>


                  {/* Problem */}
                  <div className="request-info">

                    <strong>
                      Problem
                    </strong>

                    <p>
                      {request.description}
                    </p>

                  </div>


                  {/* Location */}
                  <div className="request-info">

                    <strong>
                      📍 Location
                    </strong>

                    <p>
                      {request.location}
                    </p>

                  </div>


                  {/* Footer */}
                  <div className="request-footer">

                    <span>
                      View details →
                    </span>

                    <span>
                      {formatDate(request.createdAt)}
                    </span>

                    <button
                      type="button"
                      className="delete-request-button"
                      onClick={(event) => {
                        event.stopPropagation()
                        onDeleteRequest(index)
                      }}
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  )
}

export default CustomerHome