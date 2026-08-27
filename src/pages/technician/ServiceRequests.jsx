import { useState } from 'react'

function ServiceRequests() {
  const [requests, setRequests] = useState(() => {
    const savedRequests =
      localStorage.getItem('serviceRequests')

    if (savedRequests) {
      return JSON.parse(savedRequests)
    }

    const defaultRequests = [
      {
        id: 1,
        title: 'AC Repair',
        customer: 'Rahul',
        description: 'Customer needs AC repair.',
        location: 'Gwalior',
        status: 'Pending',
      },
      {
        id: 2,
        title: 'Washing Machine Repair',
        customer: 'Priya',
        description: 'Washing machine is not working.',
        location: 'Gwalior',
        status: 'Pending',
      },
      {
        id: 3,
        title: 'Electrical Repair',
        customer: 'Aman',
        description: 'Customer needs electrical repair.',
        location: 'Gwalior',
        status: 'Pending',
      },
    ]

    localStorage.setItem(
      'serviceRequests',
      JSON.stringify(defaultRequests)
    )

    return defaultRequests
  })

  function acceptRequest(request) {
    const existingJobs =
      JSON.parse(
        localStorage.getItem('technicianJobs')
      ) || []

    const newJob = {
      ...request,
      status: 'Accepted',
    }

    localStorage.setItem(
      'technicianJobs',
      JSON.stringify([
        ...existingJobs,
        newJob,
      ])
    )

    const updatedRequests =
      requests.filter(
        (item) => item.id !== request.id
      )

    setRequests(updatedRequests)

    localStorage.setItem(
      'serviceRequests',
      JSON.stringify(updatedRequests)
    )
  }

  function rejectRequest(id) {
    const updatedRequests =
      requests.filter(
        (request) => request.id !== id
      )

    setRequests(updatedRequests)

    localStorage.setItem(
      'serviceRequests',
      JSON.stringify(updatedRequests)
    )
  }

  return (
    <div className="page">

      <div className="page-header">
        <h1>Service Requests</h1>

        <p>
          Review and manage customer service requests.
        </p>
      </div>

      <div className="request-list">

        {requests.length === 0 ? (
          <div className="empty-state">

            <h2>No Service Requests</h2>

            <p>
              There are no pending requests at the moment.
            </p>

          </div>
        ) : (

          requests.map((request) => (

            <div
              className="request-card"
              key={request.id}
            >

              <div className="request-top">

                <div>

                  <h2>
                    {request.title}
                  </h2>

                  <p>
                    {request.description}
                  </p>

                </div>

                <span className="status pending">
                  Pending
                </span>

              </div>

              <div className="request-details">

                <p>
                  <strong>Customer:</strong>{' '}
                  {request.customer}
                </p>

                <p>
                  <strong>Location:</strong>{' '}
                  {request.location}
                </p>

              </div>

              <div className="request-actions">

                <button
                  className="accept-button"
                  onClick={() =>
                    acceptRequest(request)
                  }
                >
                  Accept
                </button>

                <button
                  className="reject-button"
                  onClick={() =>
                    rejectRequest(request.id)
                  }
                >
                  Reject
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default ServiceRequests