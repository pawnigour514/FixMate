import { useState } from 'react'
import './App.css'

import CustomerHome from './pages/customer/CustomerHome'
import CreateServiceRequest from './pages/customer/CreateServiceRequest'
import CustomerProfile from './pages/customer/CustomerProfile'
import ServiceRequestDetails from './pages/customer/ServiceRequestDetails'
import CustomerLogin from './pages/customer/CustomerLogin'
import CustomerRegister from './pages/customer/CustomerRegister'
import RequestSubmitted from './pages/customer/RequestSubmitted'
import VerifyOTP from './pages/customer/VerifyOTP'

function App() {
  const [page, setPage] = useState('login')

  const [requests, setRequests] = useState([])

  const [selectedRequest, setSelectedRequest] = useState(null)

  const [customer, setCustomer] = useState(null)

  const [selectedService, setSelectedService] = useState('')

  const [pendingRegistration, setPendingRegistration] =
    useState(null)


  /* =========================
     LOGIN
  ========================= */

  const handleLogin = (loginData) => {
    setCustomer({
      name: 'Rohit',
      email: loginData.email,
      location: '',
    })

    setPage('home')
  }


  /* =========================
     REGISTER
  ========================= */

  const handleRegister = (registerData) => {
    setPendingRegistration(registerData)

    setPage('verify-otp')
  }


  /* =========================
     VERIFY OTP
  ========================= */

  const handleVerifyOTP = () => {
    if (!pendingRegistration) {
      setPage('register')
      return
    }

    setCustomer({
      name: pendingRegistration.name,
      email: pendingRegistration.email,
      location: '',
    })

    setPendingRegistration(null)

    setPage('home')
  }


  /* =========================
     PROFILE
  ========================= */

  const handleSaveProfile = (profileData) => {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      ...profileData,
    }))
  }


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    setCustomer(null)
    setPage('login')
  }


  /* =========================
     DELETE REQUEST
  ========================= */

  const handleDeleteRequest = (requestIndex) => {
    setRequests((currentRequests) =>
      currentRequests.filter(
        (_, index) => index !== requestIndex
      )
    )
  }


  /* =========================
     CREATE REQUEST
  ========================= */

  const handleSubmitRequest = (newRequest) => {
    const requestWithDetails = {
      ...newRequest,

      id: `FM-${String(
        requests.length + 1
      ).padStart(4, '0')}`,

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


  /* =========================
     VIEW REQUEST
  ========================= */

  const handleViewRequest = (request) => {
    setSelectedRequest(request)

    setPage('details')
  }


  /* =========================
     BOOK SERVICE
  ========================= */

  const handleBookService = (service = '') => {
    setSelectedService(service)

    setPage('request')
  }


  /* =========================
     LOGIN PAGE
  ========================= */

  if (page === 'login') {
    return (
      <CustomerLogin
        onLogin={handleLogin}
        onRegister={() => setPage('register')}
      />
    )
  }


  /* =========================
     REGISTER PAGE
  ========================= */

  if (page === 'register') {
    return (
      <CustomerRegister
        onRegister={handleRegister}
        onLogin={() => setPage('login')}
      />
    )
  }


  /* =========================
     OTP PAGE
  ========================= */

  if (page === 'verify-otp') {
    return (
      <VerifyOTP
        email={pendingRegistration?.email || ''}
        onVerify={handleVerifyOTP}
        onBack={() => {
          setPendingRegistration(null)
          setPage('register')
        }}
      />
    )
  }


  /* =========================
     CREATE REQUEST
  ========================= */

  if (page === 'request') {
    return (
      <CreateServiceRequest
        onBack={() => setPage('home')}
        onSubmitRequest={handleSubmitRequest}
        initialCategory={selectedService}
      />
    )
  }


  /* =========================
     REQUEST SUBMITTED
  ========================= */

  if (page === 'submitted') {
    return (
      <RequestSubmitted
        request={selectedRequest}
        onViewRequest={handleViewRequest}
        onBackHome={() => setPage('home')}
      />
    )
  }


  /* =========================
     PROFILE
  ========================= */

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


  /* =========================
     REQUEST DETAILS
  ========================= */

  if (page === 'details') {
    return (
      <ServiceRequestDetails
        request={selectedRequest}
        onBack={() => setPage('home')}
      />
    )
  }


  /* =========================
     HOME
  ========================= */

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