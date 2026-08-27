import { useState } from 'react'
import './App.css'

import CustomerHome from './pages/customer/CustomerHome'
import CreateServiceRequest from './pages/customer/CreateServiceRequest'
import CustomerProfile from './pages/customer/CustomerProfile'
import ServiceRequestDetails from './pages/customer/ServiceRequestDetails'
import CustomerLogin from './pages/customer/CustomerLogin'
import CustomerRegister from './pages/customer/CustomerRegister'

function App() {
  const [page, setPage] = useState('login')
  const [requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)

  const [customer, setCustomer] = useState(null)

  const handleLogin = (loginData) => {
    setCustomer({
      name: 'Rohit',
      email: loginData.email,
    })

    setPage('home')
  }

  const handleRegister = (registerData) => {
    setCustomer({
      name: registerData.name,
      email: registerData.email,
    })

    setPage('home')
  }

  const handleLogout = () => {
    setCustomer(null)
    setPage('login')
  }

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

  if (page === 'login') {
    return (
      <CustomerLogin
        onLogin={handleLogin}
        onRegister={() => setPage('register')}
      />
    )
  }

  if (page === 'register') {
    return (
      <CustomerRegister
        onRegister={handleRegister}
        onLogin={() => setPage('login')}
      />
    )
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
        customer={customer}
        onLogout={handleLogout}
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
      customer={customer}
    />
  )
}

export default App