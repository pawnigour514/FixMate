import { useState } from 'react'

function CreateServiceRequest() {
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log({
      category,
      description,
      location,
      file,
    })

    alert('Service request submitted!')
  }

  return (
    <div className="service-request-page">
      <div className="service-request-container">

        <div className="service-request-header">
          <h1>FixMate</h1>
          <p>Tell us what you need help with</p>
        </div>

        <div className="service-request-card">
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="category">
                Service Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="ac-repair">AC Repair</option>
                <option value="appliance-repair">
                  Appliance Repair
                </option>
                <option value="carpentry">Carpentry</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Describe Your Problem
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Tell us what problem you are facing..."
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter your location"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="file">
                Upload Image or Video
              </label>

              <input
                id="file"
                type="file"
                accept="image/*,video/*"
                onChange={(event) => setFile(event.target.files[0])}
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