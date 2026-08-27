import { useState } from 'react'

function CustomerProfile({ onBack, customer, onSaveProfile, onLogout }) {
  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState(customer?.name || 'Rohit')
  const [email, setEmail] = useState(
    customer?.email || 'akarohit31@gmail.com'
  )
  const [location, setLocation] = useState('')

  const handleSave = (event) => {
    event.preventDefault()

    onSaveProfile({
      name,
      email,
      location,
    })

    setIsEditing(false)
  }

  return (
    <div className="profile-page">
      <div className="profile-container">

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to Home
        </button>

        <div className="profile-card">

          <div className="profile-avatar">
            {name.charAt(0).toUpperCase()}
          </div>

          <h1>My Profile</h1>

          {!isEditing ? (

            <>
              <div className="profile-info">

                <div className="profile-item">
                  <span>Name</span>
                  <strong>{name}</strong>
                </div>

                <div className="profile-item">
                  <span>Email</span>
                  <strong>{email}</strong>
                </div>

                <div className="profile-item">
                  <span>Location</span>
                  <strong>
                    {location || 'Not added'}
                  </strong>
                </div>

              </div>

              <button
                type="button"
                className="edit-profile-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>

              <button
                type="button"
                className="logout-button"
                onClick={onLogout}
              >
                Logout
              </button>
            </>

          ) : (

            <form onSubmit={handleSave}>

              <div className="form-group">
                <label htmlFor="profile-name">
                  Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-email">
                  Email
                </label>

                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-location">
                  Location
                </label>

                <input
                  id="profile-location"
                  type="text"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                className="edit-profile-button"
              >
                Save Changes
              </button>

              <button
                type="button"
                className="cancel-profile-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

            </form>

          )}

        </div>

      </div>
    </div>
  )
}

export default CustomerProfile