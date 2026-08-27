import { useState } from 'react'
import './App.css'

import CustomerHome from './pages/customer/CustomerHome'
import CreateServiceRequest from './pages/customer/CreateServiceRequest'
import CustomerProfile from './pages/customer/CustomerProfile'
import ServiceRequestDetails from './pages/customer/ServiceRequestDetails'

function App() {
  const [page, setPage] = useState('home')
  const [requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)

  const handleDeleteRequest = (requestIndex) => {
    setRequests((currentRequests) =>
      currentRequests.filter((_, index) => index !== requestIndex)
    )
  }

  const handleSubmitRequest = (newRequest) => {
    setRequests((currentRequests) => [
      ...currentRequests,
      {
        ...newRequest,
        status: 'Pending',
      },
    ])

    setPage('home')
  }

  const handleViewRequest = (request) => {
    setSelectedRequest(request)
    setPage('details')
  }

  if (page === 'request') {
    return (
      <CreateServiceRequest
        onBack={() => setPage('home')}
        onSubmitRequest={handleSubmitRequest}
      />
    )
  }

  if (page === 'profile') {
    return (
      <CustomerProfile
        onBack={() => setPage('home')}
      />
    )
  }

  if (page === 'details') {
    return (
      <ServiceRequestDetails
        request={selectedRequest}
        onBack={() => setPage('home')}
      />
    )
  }

  return (
    <CustomerHome
      onBookService={() => setPage('request')}
      onProfile={() => setPage('profile')}
      onViewRequest={handleViewRequest}
      requests={requests}
      onDeleteRequest={handleDeleteRequest}
    />
  )
}

export default App