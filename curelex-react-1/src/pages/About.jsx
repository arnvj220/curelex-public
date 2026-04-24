import { useNavigate } from 'react-router-dom'

const TEAM = [
  { name: 'Shriyansh Singh', role: 'Founder & CEO', focus: 'Leads vision, strategy, and innovation.', img: '/assets/Shriyansh Singh-Photoroom (1).png' },
  { name: 'Aman Maurya', role: 'Co-Founder & COO', focus: 'Oversees operations and execution.', img: '/assets/Aman Maurya-Photoroom.png' },
  { name: 'Ashutosh Mishra', role: 'CTO', focus: 'Heads technology and platform architecture.', img: '/assets/Ashutosh Mishra-Photoroom.png' },
  { name: 'Ishan Shrivastava', role: 'CMO', focus: 'Leads brand and growth strategy.', img: '/assets/Ishan Shrivastav-Photoroom.png' },
  { name: 'Sandhya Tiwari', role: 'CLO', focus: 'Ensures legal compliance.', img: '/assets/Sandhya Tiwari-Photoroom.png' },
  { name: 'Vishal Kumar Gond', role: 'Head – Camps', focus: 'Drives awareness programs.', img: '/assets/Vishal Gond-Photoroom.png' },
  { name: 'Pankaj Pal', role: 'Head – PR', focus: 'Manages communications & media.', img: '/assets/Pankaj Pal-Photoroom.png' },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", margin: 0, background: '#f9fafb', color: '#1f2937' }}>
      <div style={{ maxWidth: 1100, margin: 'auto', padding: '60px 20px', position: 'relative' }}>
        <button onClick={() => navigate(-1)} style={{
          position: 'absolute', top: 20, right: 20, background: '#2563eb', color: 'white',
          border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 14, cursor: 'pointer'
        }}>← Back</button>

        <section style={{ textAlign: 'center', marginBottom: 50 }}>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: '#111827', marginBottom: 15 }}>
            About <span style={{ color: '#2563eb' }}>Curelex</span>
          </h1>
          <p style={{ maxWidth: 700, margin: 'auto', color: '#6b7280', lineHeight: 1.7 }}>
            At Curelex, we are building a smarter, more connected healthcare ecosystem.
            Our mission is to make quality healthcare accessible, transparent, and continuous for everyone.
            By integrating technology with clinical expertise, we bridge the gap between patients,
            doctors, and healthcare infrastructure.
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 50 }}>
          {[
            { title: 'Our Vision', desc: 'To simplify healthcare journeys with smart digital solutions.' },
            { title: 'Patient First', desc: 'Every feature is built around improving patient experience.' },
            { title: 'Connected Care', desc: 'We connect doctors, hospitals, and patients seamlessly.' },
          ].map(c => (
            <div key={c.title} style={{ background: 'white', padding: 25, borderRadius: 14, border: '1px solid #e5e7eb' }}>
              <h2 style={{ color: '#2563eb', fontSize: 18 }}>{c.title}</h2>
              <p>{c.desc}</p>
            </div>
          ))}
        </section>

        <section style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 30, marginBottom: 10 }}>Meet the Leadership</h2>
          <p style={{ color: '#6b7280', marginBottom: 30 }}>A multidisciplinary team driving innovation in healthcare.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 25 }}>
            {TEAM.map(m => (
              <div key={m.name} style={{
                background: 'white', padding: 20, borderRadius: 16,
                border: '1px solid #e5e7eb', textAlign: 'center'
              }}>
                <img src={m.img} alt={m.name} style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', marginBottom: 10 }} />
                <h3 style={{ margin: '8px 0 4px' }}>{m.name}</h3>
                <p style={{ color: '#2563eb', fontWeight: 500, fontSize: 14, margin: '4px 0' }}>{m.role}</p>
                <p style={{ fontSize: 14, color: '#6b7280' }}>{m.focus}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer style={{ background: '#111827', padding: '20px', marginTop: 60 }}>
        <div style={{ textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
          © 2026 Curelex. All rights reserved.
        </div>
      </footer>
    </div>
  )
}