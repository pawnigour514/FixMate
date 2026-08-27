function RequestSubmitted({ request, onViewRequest, onBackHome }) {
  return (
    <div className="request-submitted-page">
      <div className="request-submitted-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Request Submitted!</h1>

        <p>
          Your service request has been successfully submitted.
        </p>

        <div className="submitted-request-id">
          <span>Request ID</span>

          <strong>
            {request?.id || 'FM-0001'}
          </strong>
        </div>

        <div className="submitted-actions">

          <button
            type="button"
            className="primary-action-button"
            onClick={() => onViewRequest(request)}
          >
            View Request
          </button>

          <button
            type="button"
            className="secondary-action-button"
            onClick={onBackHome}
          >
            Back to Home
          </button>

        </div>

      </div>
    </div>
  )
}

export default RequestSubmitted