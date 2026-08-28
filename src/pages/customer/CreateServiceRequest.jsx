import { useState } from 'react'

function CreateServiceRequest({
  onBack,
  onSubmitRequest,
  initialCategory = '',
}) {
  const [category, setCategory] = useState(initialCategory)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [file, setFile] = useState(null)
  const [locationLoading, setLocationLoading] = useState(false)

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Location is not supported by your browser.')
      return
    }

    setLocationLoading(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        setLocation(
          `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`
        )

        setLocationLoading(false)
      },
      () => {
        alert(
          'Unable to get your location. Please allow location access.'
        )

        setLocationLoading(false)
      }
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newRequest = {
      category,
      description,
      location,
      file,
    }

    onSubmitRequest(newRequest)

    alert('Service request submitted!')
  }

  return (
    <div className="service-request-page">

      <div className="service-request-container">

        <div className="service-request-topbar">

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>

          <div className="request-page-brand">

            <span className="brand-mark">
              F
            </span>

            <span className="brand-name">
              FixMate
            </span>

          </div>

        </div>


        <div className="service-request-header">

          <p className="request-page-eyebrow">
            SERVICE REQUEST
          </p>

          <h1>
            What needs fixing?
          </h1>

          <p>
            Tell us what you need help with.
          </p>

        </div>


        <div className="service-request-card">

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="category">
                Service
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                required
              >

                <option value="">
                  Select a service
                </option>

                <option value="plumbing">
                  Plumbing
                </option>

                <option value="electrical">
                  Electrical
                </option>

                <option value="ac-repair">
                  AC Repair
                </option>

                <option value="appliance-repair">
                  Appliance Repair
                </option>

                <option value="carpentry">
                  Carpentry
                </option>

              </select>

            </div>


            <div className="form-group">

              <label htmlFor="description">
                Problem
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe your problem..."
                rows="5"
                maxLength="500"
                required
              />

              <div className="character-counter">
                {description.length} / 500
              </div>

            </div>


            <div className="form-group">

              <label htmlFor="location">
                Location
              </label>

              <div className="location-input-row">

                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  placeholder="Enter your location"
                  required
                />

                <button
                  type="button"
                  className="location-button"
                  onClick={handleGetLocation}
                  disabled={locationLoading}
                >
                  {locationLoading
                    ? 'Getting...'
                    : 'Use My Location'}
                </button>

              </div>

            </div>


            <div className="form-group">

              <label htmlFor="file">
                Photos / Video
              </label>

              <label
                htmlFor="file"
                className="file-upload-area"
              >

                <span className="file-upload-icon">
                  +
                </span>

                <span className="file-upload-title">
                  {file
                    ? file.name
                    : 'Add a photo or video'}
                </span>

                <span className="file-upload-help">
                  Optional
                </span>

              </label>

              <input
                id="file"
                type="file"
                accept="image/*,video/*"
                className="file-input-hidden"
                onChange={(event) =>
                  setFile(event.target.files[0])
                }
              />

            </div>


            <div className="request-submit-area">

              <strong>
                Submit your request
              </strong>

              <button
                type="submit"
                className="submit-button"
              >
                Submit Request
                <span>→</span>
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}

export default CreateServiceRequest