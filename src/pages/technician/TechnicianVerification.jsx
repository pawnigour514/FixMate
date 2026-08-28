import { useState } from 'react'

function TechnicianVerification() {

  const saved =
    JSON.parse(
      localStorage.getItem('technicianVerification')
    ) || {}


  const [mobile, setMobile] = useState(
    saved.mobile || ''
  )

  const [otp, setOtp] = useState('')

  const [sent, setSent] = useState(false)

  const [mobileVerified, setMobileVerified] =
    useState(
      saved.mobileVerified || false
    )

  const [idType, setIdType] =
    useState(
      saved.idType || 'Aadhaar'
    )

  const [idFile, setIdFile] =
    useState(null)

  const [submitted, setSubmitted] =
    useState(
      saved.status === 'Pending' ||
      saved.status === 'Verified'
    )

  const [status, setStatus] =
    useState(
      saved.status || ''
    )


  /* =========================
     SEND OTP
  ========================= */

  function sendOTP() {

    if (mobile.length !== 10) {
      alert(
        'Enter a valid 10-digit mobile number'
      )
      return
    }

    setSent(true)

    alert(
      'OTP sent successfully. Use 123456 for testing.'
    )
  }


  /* =========================
     VERIFY OTP
  ========================= */

  function verifyOTP() {

    if (otp !== '123456') {
      alert(
        'For testing, enter OTP: 123456'
      )
      return
    }

    setMobileVerified(true)

    alert(
      'Mobile number verified!'
    )
  }


  /* =========================
     SUBMIT VERIFICATION
  ========================= */

  function submitVerification() {

    if (!mobileVerified) {
      alert(
        'Please verify your mobile number first'
      )
      return
    }

    if (!idFile) {
      alert(
        'Please upload your government ID'
      )
      return
    }


    /*
      For your project/demo:

      Once submitted, verification is
      considered approved immediately.

      This lets the blue verified badge
      appear on the technician profile.
    */

    const data = {

      mobile,

      idType,

      idFile: idFile.name,

      mobileVerified: true,

      idVerified: true,

      status: 'Verified',

    }


    localStorage.setItem(
      'technicianVerification',
      JSON.stringify(data)
    )


    setSubmitted(true)

    setStatus('Verified')


    alert(
      'Verification completed successfully!'
    )
  }


  return (

    <div className="page">


      <div className="page-header">

        <h1>
          Technician Verification
        </h1>

        <p>
          Verify your mobile number and government ID.
        </p>

      </div>


      <div className="profile-card">


        {/* =========================
            VERIFIED
        ========================= */}

        {status === 'Verified' && (

          <div className="verification-approved">

            <div className="verification-check">
              ✓
            </div>

            <h2>
              Verification Approved
            </h2>

            <p>
              Your mobile number and government ID
              have been successfully verified.
            </p>

          </div>

        )}


        {/* =========================
            PENDING
        ========================= */}

        {status === 'Pending' && (

          <div className="verification-pending">

            <h2>
              ⏳ Waiting for Approval
            </h2>

            <p>
              Your ID proof has been submitted and is
              waiting for admin approval.
            </p>

          </div>

        )}


        {/* =========================
            MOBILE
        ========================= */}

        <h2>
          Mobile Verification
        </h2>


        <div className="form-group">

          <label>
            Mobile Number
          </label>

          <input
            type="tel"
            value={mobile}
            maxLength="10"
            disabled={submitted}
            placeholder="Enter 10-digit mobile number"
            onChange={(e) =>
              setMobile(
                e.target.value.replace(/\D/g, '')
              )
            }
          />

        </div>


        {!mobileVerified && !submitted && (

          <>

            <button
              type="button"
              className="accept-button"
              onClick={sendOTP}
            >
              Send OTP
            </button>


            {sent && (

              <>

                <div className="form-group">

                  <label>
                    Enter OTP
                  </label>

                  <input
                    type="text"
                    value={otp}
                    maxLength="6"
                    placeholder="Enter OTP"
                    onChange={(e) =>
                      setOtp(
                        e.target.value.replace(
                          /\D/g,
                          ''
                        )
                      )
                    }
                  />

                </div>


                <button
                  type="button"
                  className="accept-button"
                  onClick={verifyOTP}
                >
                  Verify OTP
                </button>

              </>

            )}

          </>

        )}


        {mobileVerified && (

          <p className="online">

            ✓ Mobile number verified

          </p>

        )}


        {/* =========================
            GOVERNMENT ID
        ========================= */}

        <h2>
          Government ID Proof
        </h2>


        <div className="form-group">

          <label>
            ID Type
          </label>

          <select
            value={idType}
            disabled={submitted}
            onChange={(e) =>
              setIdType(e.target.value)
            }
          >

            <option>
              Aadhaar
            </option>

            <option>
              Driving Licence
            </option>

            <option>
              Voter ID
            </option>

            <option>
              Passport
            </option>

          </select>

        </div>


        <div className="form-group">

          <label>
            Upload Government ID
          </label>

          <input
            type="file"
            accept="image/*,.pdf"
            disabled={submitted}
            onChange={(e) =>
              setIdFile(
                e.target.files[0]
              )
            }
          />

        </div>


        {idFile && !submitted && (

          <p>
            Selected file:{' '}
            <strong>
              {idFile.name}
            </strong>
          </p>

        )}


        {/* =========================
            SUBMITTED INFORMATION
        ========================= */}

        {submitted && (

          <div className="submitted-proof">

            <p>
              <strong>
                Submitted ID:
              </strong>{' '}

              {saved.idFile ||
                idFile?.name ||
                'Government ID'}
            </p>


            <p>

              <strong>
                Status:
              </strong>{' '}

              {status === 'Verified'
                ? '✓ Verified'
                : 'Waiting for Approval'}

            </p>

          </div>

        )}


        {/* =========================
            SUBMIT BUTTON
        ========================= */}

        {!submitted && (

          <button
            type="button"
            className="save-profile"
            onClick={submitVerification}
          >
            Submit for Verification
          </button>

        )}


        {/* =========================
            SUCCESS
        ========================= */}

        {status === 'Verified' && (

          <div className="verification-success">

            <span className="big-green-check">
              ✓
            </span>

            <strong>
              Your technician account is verified.
            </strong>

            <p>
              A blue verification badge is now
              displayed on your profile.
            </p>

          </div>

        )}

      </div>

    </div>

  )
}

export default TechnicianVerification

