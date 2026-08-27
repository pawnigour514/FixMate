function CustomerProfile({ onBack }) {
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
            R
          </div>

          <h1>My Profile</h1>

          <div className="profile-info">
            <div className="profile-item">
              <span>Name</span>
              <strong>Rohit</strong>
            </div>

            <div className="profile-item">
              <span>Email</span>
              <strong>akarohit31@gmail.com</strong>
            </div>

            <div className="profile-item">
              <span>Location</span>
              <strong>Not added</strong>
            </div>
          </div>

          <button className="edit-profile-button">
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  )
}

export default CustomerProfile