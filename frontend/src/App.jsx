import { useState } from 'react'
import './App.css'

import CustomerHome from './pages/customer/CustomerHome'
import CreateServiceRequest from './pages/customer/CreateServiceRequest'
import CustomerProfile from './pages/customer/CustomerProfile'
import ServiceRequestDetails from './pages/customer/ServiceRequestDetails'
import CustomerLogin from './pages/customer/CustomerLogin'
import CustomerRegister from './pages/customer/CustomerRegister'
import RequestSubmitted from './pages/customer/RequestSubmitted'

function App() {
  const [page, setPage] = useState('login')

  const [requests, setRequests] = useState([])

  const [selectedRequest, setSelectedRequest] = useState(null)

  const [customer, setCustomer] = useState(null)

  const [selectedService, setSelectedService] = useState('')

  const handleLogin = (loginData) => {
    setCustomer({
      name: 'Rohit',
      email: loginData.email,
      location: '',
    })

    setPage('home')
  }

  const handleRegister = (registerData) => {
    setCustomer({
      name: registerData.name,
      email: registerData.email,
      location: '',
    })

    setPage('home')
  }

  const handleSaveProfile = (profileData) => {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      ...profileData,
    }))
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
    const requestWithDetails = {
      ...newRequest,
      id: `FM-${String(requests.length + 1).padStart(4, '0')}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }

    setRequests((currentRequests) => [
      ...currentRequests,
      requestWithDetails,
    ])

    setSelectedRequest(requestWithDetails)
    setSelectedService('')
    setPage('submitted')
  }

  const handleViewRequest = (request) => {
    setSelectedRequest(request)
    setPage('details')
  }

  const handleBookService = (service = '') => {
    setSelectedService(service)
    setPage('request')
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
        initialCategory={selectedService}
      />
    )
  }

  if (page === 'submitted') {
    return (
      <RequestSubmitted
        request={selectedRequest}
        onViewRequest={handleViewRequest}
        onBackHome={() => setPage('home')}
      />
    )
  }

  if (page === 'profile') {
    return (
      <CustomerProfile
        onBack={() => setPage('home')}
        customer={customer}
        onSaveProfile={handleSaveProfile}
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
      onBookService={handleBookService}
      onProfile={() => setPage('profile')}
      onViewRequest={handleViewRequest}
      requests={requests}
      onDeleteRequest={handleDeleteRequest}
      customer={customer}
    />
  )
}

export default App