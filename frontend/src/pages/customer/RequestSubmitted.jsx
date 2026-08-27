function RequestSubmitted({
  request,
  onViewRequest,
  onBackHome,
}) {
  return (
    <div className="request-submitted-page">

      <div className="request-submitted-container">

        <div className="submitted-brand">
          <span className="brand-mark">
            F
          </span>

          <span className="brand-name">
            FixMate
          </span>
        </div>


        <div className="submitted-success-icon">
          ✓
        </div>


        <p className="submitted-eyebrow">
          REQUEST SUBMITTED
        </p>

        <h1>
          Request submitted successfully
        </h1>

        <p className="submitted-description">
          Your service request has been received.
        </p>


        <div className="submitted-request-box">

          <span>
            Request ID
          </span>

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
            <span>→</span>
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