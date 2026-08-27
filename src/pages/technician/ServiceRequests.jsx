import { useState } from 'react'

function ServiceRequests() {
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('serviceRequests')

    if (saved) return JSON.parse(saved)

    const data = [
      {
        id: 1,
        title: 'AC Repair',
        customer: 'Rahul',
        phone: '9876543210',
        address: 'Gwalior',
        description: 'Customer needs AC repair.',
        location: 'Gwalior',
        status: 'Pending'
      },
      {
        id: 2,
        title: 'Washing Machine Repair',
        customer: 'Priya',
        phone: '9876543211',
        address: 'Thatipur, Gwalior',
        description: 'Washing machine is not working.',
        location: 'Thatipur, Gwalior',
        status: 'Pending'
      },
      {
        id: 3,
        title: 'Electrical Repair',
        customer: 'Aman',
        phone: '9876543212',
        address: 'Lashkar, Gwalior',
        description: 'Customer needs electrical repair.',
        location: 'Lashkar, Gwalior',
        status: 'Pending'
      }
    ]

    localStorage.setItem(
      'serviceRequests',
      JSON.stringify(data)
    )

    return data
  })

  const [charges, setCharges] = useState({})

  function acceptRequest(request) {
    const charge = charges[request.id]

    if (!charge) {
      alert('Please enter your charge.')
      return
    }

    const jobs =
      JSON.parse(
        localStorage.getItem('technicianJobs')
      ) || []

    const newJob = {
      ...request,
      charge: Number(charge),
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

      {requests.length === 0 ? (
        <div className="empty-state">
          <h2>No Service Requests</h2>
          <p>No pending requests at the moment.</p>
        </div>
      ) : (
        <div className="request-list">

          {requests.map((request) => (
            <div
              className="request-card"
              key={request.id}
            >

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
                  <strong>Customer:</strong>{' '}
                  {request.customer}
                </p>

                <p>
                  <strong>Phone:</strong>{' '}
                  {request.phone}
                </p>

                <p>
                  <strong>Location:</strong>{' '}
                  {request.address}
                </p>

                <a
                  href={
                    'https://www.google.com/maps/search/?api=1&query=' +
                    encodeURIComponent(request.address)
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="card-button"
                >
                  📍 Open Google Maps
                </a>

              </div>

              <div className="request-actions">

                <input
                  type="number"
                  placeholder="Your charge ₹"
                  value={charges[request.id] || ''}
                  onChange={(e) =>
                    setCharges({
                      ...charges,
                      [request.id]: e.target.value
                    })
                  }
                />

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
          ))}

        </div>
      )}

    </div>
  )
}

export default ServiceRequests

