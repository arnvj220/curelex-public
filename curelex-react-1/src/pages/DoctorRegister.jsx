import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Toast, useToast } from '../components/Toast'
import { API } from '../utils/helpers'

const SPECIALIZATIONS = [
  'General Medicine', 'Cardiology', 'Neurology', 'Orthopedics',
  'Pediatrics', 'Dermatology', 'Ophthalmology', 'ENT',
  'Psychiatry', 'Gynecology', 'Orthopedic Surgery', 'Urology',
]

const INITIAL = {
  name: '', mobile: '', specialization: '',
  address: '', aadhaar: '', licenseNumber: '',
  experience: '', currentInstitute: '', totalPatients: '',
  consultationCharge: '', email: '', password: '', confirmPassword: '',
  profilePhoto: null, regCertificate: null,
}

export default function DoctorRegister() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const showToast = useToast()

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const setFile = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.files[0] }))

  const next = () => {
    if (step === 1 && (!form.name || !form.mobile || !form.specialization)) {
      showToast('Please fill all required fields', 'error'); return
    }
    if (step === 2 && (!form.address || !form.aadhaar || !form.licenseNumber)) {
      showToast('Please fill all required fields', 'error'); return
    }
    setStep(s => s + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      showToast('Passwords do not match', 'error'); return
    }
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => { if (v !== null) fd.append(k, v) })
      const res = await fetch(`${API}/doctors/register`, { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success || res.ok) {
        setStep(4)
      } else {
        showToast(data.message || 'Registration failed', 'error')
      }
    } catch {
      showToast('Server error. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const stepLabels = ['Basic Info', 'Documents', 'Experience']

  return (
    <>
      <Navbar />
      <div style={{ height: 81, background: 'var(--bg-primary)' }}></div>
      <section className="auth-page-container">
        <div className="auth-page-left">
          <div className="auth-page-content">
            <h1>Join CURELEX</h1>
            <p>Become part of our network of medical professionals serving thousands of patients</p>
            <div className="auth-benefits">
              {[
                ['users', 'Connect with Thousands of Patients'],
                ['video', 'Conduct Video Consultations'],
                ['chart-line', 'Grow Your Practice'],
                ['shield-alt', 'Secure Platform'],
              ].map(([icon, label]) => (
                <div className="benefit-item" key={label}>
                  <i className={`fas fa-${icon}`}></i>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="auth-page-right">
          <div className="auth-page-card multi-step-card">
            <div className="multi-step-header">
              <h2>Doctor Registration</h2>
              <div className="step-indicator">
                {stepLabels.map((label, i) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={`step ${step >= i + 1 ? 'active' : ''}`} data-step={i + 1}>
                      <span>{i + 1}</span>
                      <p>{label}</p>
                    </div>
                    {i < stepLabels.length - 1 && <div className="step-line"></div>}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {step === 1 && (
                <div className="multi-step-content">
                  <div className="step-page active">
                    <h3>Step 1: Basic Information</h3>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" placeholder="Enter your full name" value={form.name} onChange={set('name')} required />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number *</label>
                      <input type="tel" placeholder="Enter your mobile number" value={form.mobile}
                        onChange={set('mobile')} pattern="[0-9]{10}" maxLength={10} required />
                    </div>
                    <div className="form-group">
                      <label>Specialization *</label>
                      <select value={form.specialization} onChange={set('specialization')} required>
                        <option value="">Select specialization</option>
                        {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <p className="step-note">Your account will be verified after submission</p>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="multi-step-content">
                  <div className="step-page active">
                    <h3>Step 2: Professional Documents</h3>
                    <div className="form-group">
                      <label>Address *</label>
                      <input type="text" placeholder="Enter your address" value={form.address} onChange={set('address')} required />
                    </div>
                    <div className="form-group">
                      <label>Aadhaar Number *</label>
                      <input type="text" placeholder="Enter 12-digit Aadhaar" value={form.aadhaar}
                        onChange={set('aadhaar')} pattern="[0-9]{12}" maxLength={12} required />
                    </div>
                    <div className="form-group">
                      <label>Professional Photo *</label>
                      <div className="file-upload-box">
                        <input type="file" accept="image/*" onChange={setFile('profilePhoto')} required />
                        <div className="upload-placeholder">
                          <i className="fas fa-cloud-upload-alt"></i>
                          <p>{form.profilePhoto ? form.profilePhoto.name : 'Click to upload or drag and drop'}</p>
                          <span>PNG, JPG up to 5MB</span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>License Number *</label>
                      <input type="text" placeholder="Enter license number" value={form.licenseNumber}
                        onChange={set('licenseNumber')} required />
                    </div>
                    <div className="form-group">
                      <label>Registration Certificate</label>
                      <div className="file-upload-box">
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={setFile('regCertificate')} />
                        <div className="upload-placeholder">
                          <i className="fas fa-cloud-upload-alt"></i>
                          <p>{form.regCertificate ? form.regCertificate.name : 'Click to upload or drag and drop'}</p>
                          <span>PDF, PNG, JPG up to 10MB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="multi-step-content">
                  <div className="step-page active">
                    <h3>Step 3: Professional Experience</h3>
                    <div className="form-group">
                      <label>Years of Experience *</label>
                      <input type="number" placeholder="Enter years of experience" value={form.experience}
                        onChange={set('experience')} min={0} max={50} required />
                    </div>
                    <div className="form-group">
                      <label>Current Practice Institute *</label>
                      <input type="text" placeholder="Enter hospital/clinic name" value={form.currentInstitute}
                        onChange={set('currentInstitute')} required />
                    </div>
                    <div className="form-group">
                      <label>Total Patient Consultations (Approx.) *</label>
                      <input type="number" placeholder="Enter approximate total patients" value={form.totalPatients}
                        onChange={set('totalPatients')} min={0} required />
                    </div>
                    <div className="form-group">
                      <label>Consultation Charge per Patient (₹) *</label>
                      <input type="number" placeholder="Enter consultation charge" value={form.consultationCharge}
                        onChange={set('consultationCharge')} min={0} required />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" placeholder="Enter your email" value={form.email}
                        onChange={set('email')} required />
                    </div>
                    <div className="form-group">
                      <label>Create Password *</label>
                      <input type="password" placeholder="Create a strong password" value={form.password}
                        onChange={set('password')} required />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password *</label>
                      <input type="password" placeholder="Confirm your password" value={form.confirmPassword}
                        onChange={set('confirmPassword')} required />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 — Success */}
              {step === 4 && (
                <div className="multi-step-content">
                  <div className="step-page active" style={{ textAlign: 'center' }}>
                    <div className="success-message">
                      <i className="fas fa-check-circle"></i>
                      <h3>Application Submitted Successfully!</h3>
                      <p>Our team will review your application and connect with you very soon.</p>
                      <div className="success-details">
                        <p>You'll receive a confirmation email shortly. Once verified, you can log in and start connecting with patients.</p>
                        <p><strong>Typical verification time: 24-48 hours</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step < 4 && (
                <div className="multi-step-controls">
                  {step > 1 && (
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>
                      <i className="fas fa-arrow-left"></i> Previous
                    </button>
                  )}
                  {step < 3 && (
                    <button type="button" className="btn btn-primary" onClick={next}>
                      Next <i className="fas fa-arrow-right"></i>
                    </button>
                  )}
                  {step === 3 && (
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      <i className="fas fa-check"></i> {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              )}
            </form>

            {step < 4 && (
              <p className="auth-switch">
                Already have an account? <Link to="/doctor-login">Sign In</Link>
              </p>
            )}
          </div>
        </div>
      </section>
      <Toast />
    </>
  )
}