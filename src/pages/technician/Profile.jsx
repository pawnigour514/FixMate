import { useState } from 'react'

function Profile() {
  const savedProfile =
    JSON.parse(localStorage.getItem('technicianProfile')) || {
      name: 'Rahul Sharma',
      phone: '9876543210',
      service: 'AC Repair',
      location: 'Gwalior',
      isOnline: true,
    }

  const [name, setName] = useState(savedProfile.name)
  const [phone, setPhone] = useState(savedProfile.phone)
  const [service, setService] = useState(savedProfile.service)
  const [location, setLocation] = useState(savedProfile.location)
  const [isOnline, setIsOnline] = useState(savedProfile.isOnline)

  function saveProfile() {
    if (!name.trim()) {
      alert('Please enter your name')
      return
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number')
      return
    }

    if (!service.trim()) {
      alert('Please enter your service')
      return
    }

    if (!location.trim()) {
      alert('Please enter your location')
      return
    }

    const profile = {
      name: name.trim(),
      phone,
      service: service.trim(),
      location: location.trim(),
      isOnline,
    }

    localStorage.setItem(
      'technicianProfile',
      JSON.stringify(profile)
    )

    alert('Profile updated successfully!')
  }

  function toggleAvailability() {
    const newStatus = !isOnline

    setIsOnline(newStatus)

    const profile = {
      name,
      phone,
      service,
      location,
      isOnline: newStatus,
    }

    localStorage.setItem(
      'technicianProfile',
      JSON.stringify(profile)
    )
  }

  return (
    <div className="page">

      {/* Page Header */}
      <div className="page-header">
        <h1>Technician Profile</h1>

        <p>
          Manage your personal information and availability.
        </p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">

        {/* Profile Top */}
        <div className="profile-top">

          <div className="profile-avatar">
            {name
              .split(' ')
              .filter(Boolean)
              .map((word) => word[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div>
            <h2>{name}</h2>

            <p>
              {service} Technician
            </p>

            <span
              className={
                isOnline ? 'online' : 'offline'
              }
            >
              ● {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

        </div>

        {/* Availability */}
        <div className="availability">

          <h3>Availability</h3>

          <button
            type="button"
            className={
              isOnline
                ? 'online-button'
                : 'offline-button'
            }
            onClick={toggleAvailability}
          >
            {isOnline
              ? 'Go Offline'
              : 'Go Online'}
          </button>

        </div>

        {/* Profile Form */}
        <div className="profile-form">

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="tel"
              value={phone}
              maxLength="10"
              onChange={(e) =>
                setPhone(
                  e.target.value.replace(/\D/g, '')
                )
              }
              placeholder="Enter 10-digit phone number"
            />
          </div>

          <div className="form-group">
            <label>Service</label>

            <input
              type="text"
              value={service}
              onChange={(e) =>
                setService(e.target.value)
              }
              placeholder="Example: AC Repair"
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="Enter your location"
            />
          </div>

        </div>

        {/* Save */}
        <button
          type="button"
          className="save-profile"
          onClick={saveProfile}
        >
          Save Profile
        </button>

      </div>

    </div>
  )
}

export default Profile