import { formatDate, parseMedicines } from '../utils/helpers'

export default function ViewPrescriptionModal({ prescription, onClose }) {
  if (!prescription) return null

  const doctorLabel = prescription.doctorName
    ? `Dr. ${prescription.doctorName}`
    : prescription.doctorId ? `Dr. #${prescription.doctorId}` : 'Doctor'

  const medicines = parseMedicines(prescription.medicines)

  return (
    <div className="modal active" id="viewPrescriptionModal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container" style={{ maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="appointment-modal-header">
          <i className="fas fa-prescription-bottle-alt"></i>
          <h2>Prescription</h2>
          <p>Issued: {formatDate(prescription.createdAt)} · {doctorLabel}</p>
        </div>
        <div style={{ padding: '0 1.5rem 1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: 8, fontSize: 13 }}>Medicine</th>
                <th style={{ padding: 8, fontSize: 13 }}>Dosage</th>
                <th style={{ padding: 8, fontSize: 13 }}>Frequency</th>
                <th style={{ padding: 8, fontSize: 13 }}>Duration</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((m, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8, fontWeight: 500 }}>{m.name}</td>
                  <td style={{ padding: 8 }}>{m.dosage}</td>
                  <td style={{ padding: 8 }}>{m.frequency || '-'}</td>
                  <td style={{ padding: 8 }}>{m.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {prescription.notes && (
            <div style={{ background: 'rgba(99,102,241,0.06)', borderRadius: 8, padding: 10 }}>
              <strong><i className="fas fa-sticky-note"></i> Notes:</strong>
              <p style={{ margin: '4px 0 0' }}>{prescription.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}