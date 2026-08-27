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

      <header className="customer-header">
        <h1>FixMate</h1>

        <button
          className="profile-button"
          onClick={onProfile}
        >
          👤 Profile
        </button>
      </header>


      <main className="customer-content">

        <section className="welcome-section">
          <h2>
            Hello, {customer?.name || 'Rohit'} 👋
          </h2>

          <p>
            What service do you need today?
          </p>

          <button
            className="book-service-button"
            onClick={() => handleServiceClick('')}
          >
            Book a Service
          </button>
        </section>


        <section className="services-section">
          <h2>Popular Services</h2>

          <div className="service-grid">

            <button
              onClick={() =>
                handleServiceClick('plumbing')
              }
            >
              🔧 Plumbing
            </button>

            <button
              onClick={() =>
                handleServiceClick('electrical')
              }
            >
              ⚡ Electrical
            </button>

            <button
              onClick={() =>
                handleServiceClick('ac-repair')
              }
            >
              ❄️ AC Repair
            </button>

            <button
              onClick={() =>
                handleServiceClick('appliance-repair')
              }
            >
              🔌 Appliance Repair
            </button>

            <button
              onClick={() =>
                handleServiceClick('carpentry')
              }
            >
              🪚 Carpentry
            </button>

          </div>
        </section>


        <section className="requests-section">
          <h2>My Recent Requests</h2>

          {requests.length === 0 ? (

            <div className="empty-requests">

              <p>
                You don't have any service requests yet.
              </p>

              <button
                className="book-service-button"
                onClick={() =>
                  handleServiceClick('')
                }
              >
                Create Your First Request
              </button>

            </div>

          ) : (

            <div className="request-list">

              {requests.map((request, index) => (

                <div
                  className="request-card"
                  key={index}
                  onClick={() =>
                    onViewRequest(request)
                  }
                >

                  <div className="request-card-top">

                    <h3>
                      {request.category.charAt(0).toUpperCase() +
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


                  <div className="request-info">

                    <strong>
                      Problem
                    </strong>

                    <p>
                      {request.description}
                    </p>

                  </div>


                  <div className="request-info">

                    <strong>
                      📍 Location
                    </strong>

                    <p>
                      {request.location}
                    </p>

                  </div>


                  <div className="request-footer">

                    <span>
                      Submitted{' '}
                      {formatDate(request.createdAt)}
                    </span>

                    <button
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