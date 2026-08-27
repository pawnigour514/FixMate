import { useState } from 'react'
import './App.css'

import CustomerHome from './pages/customer/CustomerHome'
import CreateServiceRequest from './pages/customer/CreateServiceRequest'
import CustomerProfile from './pages/customer/CustomerProfile'

function App() {
  const [page, setPage] = useState('home')
  const [requests, setRequests] = useState([])

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

  return (
    <CustomerHome
      onBookService={() => setPage('request')}
      onProfile={() => setPage('profile')}
      requests={requests}
      onDeleteRequest={handleDeleteRequest}
    />
  )
}

export default App