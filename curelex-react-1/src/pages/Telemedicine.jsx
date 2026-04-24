import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DashboardHeader from '../components/DashboardHeader'
import { Toast, useToast } from '../components/Toast'
import { API, authHeaders } from '../utils/helpers'

export default function Telemedicine() {
  const { currentUser, token } = useAuth()
  const navigate = useNavigate()
  const showToast = useToast()

  const [doctors, setDoctors] = useState([])
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    age: currentUser?.age || '',
    symptoms: '',
    appointmentTime: '',
    doctorId: '',
  })
  const [success, setSuccess] = useState(null)

  useEffect(() => { loadDoctors() }, [])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function loadDoctors() {
    try {
      const res = await fetch(`${API}/doctors/all`, { headers: authHeaders(token) })
      const data = await res.json()
      if (data.success) setDoctors(data.doctors.filter(d => d.verificationStatus === 'approved'))
    } catch (err) { console.error(err) }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch(`${API}/appointments/book`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({
          patientId: currentUser.id,
          doctorId: form.doctorId,
          symptoms: form.symptoms,
          appointmentTime: form.appointmentTime,
        }),
      })
      const data = await res.json()
      if (data.message !== 'Appointment booked successfully') throw new Error(data.message)
      setSuccess({ appointment: data.appointment, meetingLink: data.appointment?.meetingLink })
    } catch (err) {
      showToast(err.message || 'Failed to book appointment', 'error')
    }
  }

  return (
    <div className="dashboard-page">
      <DashboardHeader
        backTo="/patient-dashboard"
        backLabel="Back to Dashboard"
        rightContent={<span>Booking for {currentUser?.name}</span>}
      />

      <main className="dashboard-main">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--primary-color)' }}>Telemedicine Appointment</h1>
          <p>Fill in details to book your online consultation</p>
        </div>

        <div className="dashboard-card full-width">
          <div className="card-header">
            <i className="fas fa-video"></i>
            <h3>Appointment Details</h3>
          </div>
          <div className="card-body">
            {success ? (
              <div>
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  <h3 style={{ color: 'var(--text-primary)', margin: '1rem 0' }}>Appointment Booked Successfully!</h3>
                  <p>Doctor ID: {success.appointment.doctorId}</p>
                  <p>Time: {new Date(success.appointment.appointmentTime).toLocaleString()}</p>
                </div>
                {success.meetingLink && (
                  <button className="btn btn-primary btn-full" onClick={() => window.open(success.meetingLink, '_blank')}>
                    Join Meeting
                  </button>
                )}
                <button className="btn btn-secondary btn-full" style={{ marginTop: '1rem' }}
                  onClick={() => navigate('/patient-dashboard')}>
                  Back to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Patient Name *</label>
                    <input type="text" value={form.name} onChange={set('name')} required />
                  </div>
                  <div className="form-group">
                    <label>Age *</label>
                    <input type="number" value={form.age} onChange={set('age')} min={1} max={150} required />
                  </div>
                  <div className="form-group">
                    <label>Symptoms *</label>
                    <textarea rows={3} placeholder="Describe your symptoms..." value={form.symptoms}
                      onChange={set('symptoms')} required style={{ resize: 'vertical' }}></textarea>
                  </div>
                  <div className="form-group full-width">
                    <label>Preferred Time *</label>
                    <input type="datetime-local" value={form.appointmentTime} onChange={set('appointmentTime')} required />
                  </div>
                  <div className="form-group">
                    <label>Assigned Doctor *</label>
                    <select value={form.doctorId} onChange={set('doctorId')} required>
                      <option value="">Select Doctor</option>
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-secondary"
                    onClick={() => navigate('/patient-dashboard')}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-full">Book Appointment</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Toast />
    </div>
  )
}