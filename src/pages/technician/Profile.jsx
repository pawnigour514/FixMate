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
    const profile = {
      name,
      phone,
      service,
      location,
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

      <div className="page-header">
        <h1>Technician Profile</h1>
        <p>Manage your personal information and availability.</p>
      </div>

      <div className="profile-card">

        <div className="profile-top">

          <div className="profile-avatar">
            {name
              .split(' ')
              .map((word) => word[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div>
            <h2>{name}</h2>

            <p>{service} Technician</p>

            <span className={isOnline ? 'online' : 'offline'}>
              ● {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

        </div>

        <div className="availability">

          <h3>Availability</h3>

          <button
            className={
              isOnline
                ? 'online-button'
                : 'offline-button'
            }
            onClick={toggleAvailability}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>

        </div>

        <div className="profile-form">

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Service</label>

            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

        </div>

        <button
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