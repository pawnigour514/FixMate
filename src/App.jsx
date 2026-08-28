
import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'

import TechnicianLogin from './pages/technician/TechnicianLogin'
import TechnicianDashboard from './pages/technician/TechnicianDashboard'
import ServiceRequests from './pages/technician/ServiceRequests'
import MyJobs from './pages/technician/MyJobs'
import Profile from './pages/technician/Profile'
import TechnicianVerification from './pages/technician/TechnicianVerification'
import ProtectedRoute from './pages/technician/ProtectedRoute'
import TechnicianLayout from './pages/technician/TechnicianLayout'
import JobDetails from './pages/technician/JobDetails'

import CustomerLogin from './pages/customer/CustomerLogin'
import CustomerRegister from './pages/customer/CustomerRegister'
import CustomerHome from './pages/customer/CustomerHome'
import CreateServiceRequest from './pages/customer/CreateServiceRequest'

import './App.css'


/* =========================
   HOME PAGE
========================= */

function Home() {
  return (
    <div className="home-page">

      <div className="home-content">

        <h1 className="home-logo">
          FixMate
        </h1>

        <p className="home-tagline">
          Your trusted platform for reliable home services
        </p>

        <h2>
          Continue as
        </h2>

        <div className="role-container">

          <Link
            to="/login"
            className="role-card"
          >
            <div className="role-icon">
              👨‍🔧
            </div>

            <h3>
              Technician
            </h3>

            <p>
              Manage service requests, jobs and
              your technician profile.
            </p>

            <span>
              Continue as Technician →
            </span>

          </Link>


          <Link
            to="/customer-login"
            className="role-card"
          >
            <div className="role-icon">
              👤
            </div>

            <h3>
              Customer
            </h3>

            <p>
              Book trusted technicians and manage
              your service requests.
            </p>

            <span>
              Continue as Customer →
            </span>

          </Link>

        </div>

        <p className="home-footer">
          Fast • Reliable • Trusted
        </p>

      </div>

    </div>
  )
}


/* =========================
   CUSTOMER APP
========================= */

function CustomerApp() {

  const navigate = useNavigate()

  const [customer, setCustomer] = useState(() => {
    return JSON.parse(
      localStorage.getItem('customer')
    ) || null
  })

  const [requests, setRequests] = useState(() => {
    return JSON.parse(
      localStorage.getItem('customerRequests')
    ) || []
  })


  /* =========================
     CUSTOMER LOGIN
  ========================= */

  function handleCustomerLogin(data) {

    const savedCustomer =
      JSON.parse(
        localStorage.getItem('customerAccount')
      )

    if (
      savedCustomer &&
      savedCustomer.email === data.email &&
      savedCustomer.password === data.password
    ) {

      setCustomer(savedCustomer)

      localStorage.setItem(
        'customer',
        JSON.stringify(savedCustomer)
      )

      navigate('/customer-home')

    } else {

      alert(
        'Invalid email or password. Please register first.'
      )

    }
  }


  /* =========================
     CUSTOMER REGISTER
  ========================= */

  function handleCustomerRegister(data) {

    localStorage.setItem(
      'customerAccount',
      JSON.stringify(data)
    )

    localStorage.setItem(
      'customer',
      JSON.stringify(data)
    )

    setCustomer(data)

    alert(
      'Account created successfully!'
    )

    navigate('/customer-home')
  }


  /* =========================
     BOOK SERVICE
  ========================= */

  function handleBookService(category) {

    navigate('/create-service-request', {
      state: {
        category,
      },
    })
  }


  /* =========================
     SUBMIT SERVICE REQUEST
  ========================= */

  function handleSubmitRequest(requestData) {

    const newRequest = {

      id: Date.now(),

      category: requestData.category,

      description: requestData.description,

      location: requestData.location,

      customer:
        customer?.name || 'Customer',

      phone:
        customer?.phone || '',

      email:
        customer?.email || '',

      status: 'Pending',

      createdAt:
        new Date().toISOString(),

    }


    const updatedRequests = [
      ...requests,
      newRequest,
    ]

    setRequests(updatedRequests)


    /* Save for customer */

    localStorage.setItem(
      'customerRequests',
      JSON.stringify(updatedRequests)
    )


    /* Save for technician */

    const technicianRequests =
      JSON.parse(
        localStorage.getItem('serviceRequests')
      ) || []

    technicianRequests.push(newRequest)

    localStorage.setItem(
      'serviceRequests',
      JSON.stringify(technicianRequests)
    )


    alert(
      'Service request submitted successfully!'
    )

    navigate('/customer-home')
  }


  /* =========================
     DELETE REQUEST
  ========================= */

  function handleDeleteRequest(index) {

    const updatedRequests =
      requests.filter(
        (_, i) => i !== index
      )

    setRequests(updatedRequests)

    localStorage.setItem(
      'customerRequests',
      JSON.stringify(updatedRequests)
    )


    /* Also remove from technician requests */

    const technicianRequests =
      JSON.parse(
        localStorage.getItem('serviceRequests')
      ) || []

    const deletedRequest =
      requests[index]

    const updatedTechnicianRequests =
      technicianRequests.filter(
        request =>
          request.id !== deletedRequest?.id
      )

    localStorage.setItem(
      'serviceRequests',
      JSON.stringify(
        updatedTechnicianRequests
      )
    )
  }


  /* =========================
     VIEW REQUEST
  ========================= */

  function handleViewRequest(request) {

    alert(
      `Service: ${request.category}\nStatus: ${request.status}\nLocation: ${request.location}`
    )
  }


  /* =========================
     CUSTOMER PROFILE
  ========================= */

  function handleProfile() {

    alert(
      'Customer Profile coming next.'
    )
  }


  return (
    <Routes>

      {/* CUSTOMER LOGIN */}

      <Route
        path="/customer-login"
        element={
          <CustomerLogin
            onLogin={handleCustomerLogin}
            onRegister={() =>
              navigate('/customer-register')
            }
          />
        }
      />


      {/* CUSTOMER REGISTER */}

      <Route
        path="/customer-register"
        element={
          <CustomerRegister
            onRegister={handleCustomerRegister}
            onLogin={() =>
              navigate('/customer-login')
            }
          />
        }
      />


      {/* CUSTOMER HOME */}

      <Route
        path="/customer-home"
        element={
          <CustomerHome
            customer={customer}
            requests={requests}
            onBookService={handleBookService}
            onProfile={handleProfile}
            onViewRequest={handleViewRequest}
            onDeleteRequest={handleDeleteRequest}
          />
        }
      />


      {/* CREATE SERVICE REQUEST */}

      <Route
        path="/create-service-request"
        element={
          <CreateServiceRequestWrapper
            onBack={() =>
              navigate('/customer-home')
            }
            onSubmitRequest={
              handleSubmitRequest
            }
          />
        }
      />

    </Routes>
  )
}


/* =========================
   CREATE REQUEST WRAPPER
========================= */

function CreateServiceRequestWrapper({
  onBack,
  onSubmitRequest,
}) {

  const location = window.history.state

  return (
    <CreateServiceRequest
      onBack={onBack}
      onSubmitRequest={onSubmitRequest}
      initialCategory=""
    />
  )
}


/* =========================
   MAIN APP
========================= */

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================
            TECHNICIAN
        ========================= */}

        <Route
          path="/login"
          element={<TechnicianLogin />}
        />


        <Route element={<ProtectedRoute />}>

          <Route element={<TechnicianLayout />}>

            <Route
              path="/technician-dashboard"
              element={
                <TechnicianDashboard />
              }
            />

            <Route
              path="/service-requests"
              element={
                <ServiceRequests />
              }
            />

            <Route
              path="/my-jobs"
              element={
                <MyJobs />
              }
            />

            <Route
              path="/job/:id"
              element={
                <JobDetails />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile />
              }
            />

            <Route
              path="/verification"
              element={
                <TechnicianVerification />
              }
            />

          </Route>

        </Route>


        {/* =========================
            CUSTOMER APP
        ========================= */}

        <Route
          path="*"
          element={
            <CustomerApp />
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App

