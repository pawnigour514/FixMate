import { useState } from 'react'

function ServiceRequests() {
  const [requests, setRequests] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('serviceRequests'))

    if (saved) return saved

    const data = [
      {
        id: 1,
        title: 'AC Repair',
        customer: 'Rahul',
        description: 'Customer needs AC repair.',
        location: 'Gwalior',
        status: 'Pending'
      },
      {
        id: 2,
        title: 'Washing Machine Repair',
        customer: 'Priya',
        description: 'Washing machine is not working.',
        location: 'Gwalior',
        status: 'Pending'
      },
      {
        id: 3,
        title: 'Electrical Repair',
        customer: 'Aman',
        description: 'Customer needs electrical repair.',
        location: 'Gwalior',
        status: 'Pending'
      }
    ]

    localStorage.setItem('serviceRequests', JSON.stringify(data))
    return data
  })

  function acceptRequest(request) {
    const jobs =
      JSON.parse(localStorage.getItem('technicianJobs')) || []

    const newJob = {
      ...request,
      status: 'Accepted'
    }

    localStorage.setItem(
      'technicianJobs',
      JSON.stringify([...jobs, newJob])
    )

    const updated = requests.filter(
      (item) => item.id !== request.id
    )

    setRequests(updated)

    localStorage.setItem(
      'serviceRequests',
      JSON.stringify(updated)
    )
  }

  function rejectRequest(id) {
    const updated = requests.filter(
      (item) => item.id !== id
    )

    setRequests(updated)

    localStorage.setItem(
      'serviceRequests',
      JSON.stringify(updated)
    )
  }

  return (
    <div className="page">

      <div className="page-header">
        <h1>Service Requests</h1>
        <p>Review and manage customer service requests.</p>
      </div>

      <div className="request-list">

        {requests.length === 0 ? (
          <div className="empty-state">
            <h2>No Service Requests</h2>
            <p>No pending requests at the moment.</p>
          </div>
        ) : (

          requests.map((request) => (
            <div className="request-card" key={request.id}>

              <div className="request-top">
                <div>
                  <h2>{request.title}</h2>
                  <p>{request.description}</p>
                </div>

                <span className="status pending">
                  Pending
                </span>
              </div>

              <div className="request-details">
                <p>
                  <strong>Customer:</strong> {request.customer}
                </p>

                <p>
                  <strong>Location:</strong> {request.location}
                </p>
              </div>

              <div className="request-actions">

                <button
                  className="accept-button"
                  onClick={() => acceptRequest(request)}
                >
                  Accept
                </button>

                <button
                  className="reject-button"
                  onClick={() => rejectRequest(request.id)}
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