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

  const serviceNames = {
    plumbing: '🔧 Plumbing',
    electrical: '⚡ Electrical',
    'ac-repair': '❄️ AC Repair',
    'appliance-repair': '🔌 Appliance Repair',
    carpentry: '🪚 Carpentry',
  }

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

        <div className="service-request-header">

          <button type="button" onClick={onBack}>
            ← Back to Home
          </button>

          <h1>FixMate</h1>

          <p>
            Tell us what you need help with
          </p>

        </div>

        <div className="service-request-card">

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="category">
                Service Category
              </label>

              {category && (
                <div className="selected-service">
                  You're booking:{' '}
                  <strong>
                    {serviceNames[category]}
                  </strong>
                </div>
              )}

              <select
                id="category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                required
              >
                <option value="">
                  Select a category
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
                Describe Your Problem
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Tell us what problem you are facing..."
                rows="5"
                maxLength="500"
                required
              />

              <div className="character-counter">
                {description.length} / 500 characters
              </div>

            </div>


            <div className="form-group">

              <label htmlFor="location">
                📍 Location
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
                Upload Image or Video
              </label>

              <input
                id="file"
                type="file"
                accept="image/*,video/*"
                onChange={(event) =>
                  setFile(event.target.files[0])
                }
              />

            </div>


            <button
              type="submit"
              className="submit-button"
            >
              Submit Service Request
            </button>

          </form>

        </div>

      </div>
    </div>
  )
}

export default CreateServiceRequest