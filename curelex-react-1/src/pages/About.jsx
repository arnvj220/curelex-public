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

const VALUES = [
  { title: 'Our Vision', desc: 'To simplify healthcare journeys with smart digital solutions.' },
  { title: 'Patient First', desc: 'Every feature is built around improving patient experience.' },
  { title: 'Connected Care', desc: 'We connect doctors, hospitals, and patients seamlessly.' },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .about-wrapper {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          background: #f9fafb;
          color: #1f2937;
        }

        .about-container {
          max-width: 1100px;
          margin: auto;
          padding: 60px 20px;
          position: relative;
        }

        .back-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #2563eb;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
        }

        /* Hero */
        .about-hero {
          text-align: center;
          margin-bottom: 50px;
          padding-top: 10px;
        }

        .about-hero h1 {
          font-size: clamp(26px, 6vw, 40px);
          font-weight: 700;
          color: #111827;
          margin-bottom: 15px;
        }

        .about-hero h1 span {
          color: #2563eb;
        }

        .about-hero p {
          max-width: 700px;
          margin: auto;
          color: #6b7280;
          line-height: 1.7;
          font-size: clamp(13px, 3.5vw, 16px);
        }

        /* Values grid */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 50px;
        }

        .value-card {
          background: white;
          padding: 25px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
        }

        .value-card h2 {
          color: #2563eb;
          font-size: 17px;
          margin: 0 0 8px;
        }

        .value-card p {
          margin: 0;
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
        }

        /* Team section */
        .team-section {
          text-align: center;
        }

        .team-section h2 {
          font-size: clamp(22px, 5vw, 30px);
          margin-bottom: 10px;
        }

        .team-section > p {
          color: #6b7280;
          margin-bottom: 30px;
          font-size: clamp(13px, 3.5vw, 15px);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .team-card {
          background: white;
          padding: 20px;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .team-card img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 10px;
        }

        .team-card h3 {
          margin: 8px 0 4px;
          font-size: 15px;
        }

        .team-card .role {
          color: #2563eb;
          font-weight: 500;
          font-size: 13px;
          margin: 4px 0;
        }

        .team-card .focus {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
          line-height: 1.5;
        }

        /* Footer */
        .about-footer {
          background: #111827;
          padding: 20px;
          margin-top: 60px;
        }

        .about-footer div {
          text-align: center;
          font-size: 13px;
          color: #6b7280;
        }

        /* ── Tablet ── */
        @media (max-width: 768px) {
          .about-container {
            padding: 60px 16px 40px;
          }

          .values-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .team-card img {
            width: 72px;
            height: 72px;
          }
        }

        /* ── Mobile: horizontal scroll ── */
        @media (max-width: 480px) {
          .about-container {
            padding: 56px 14px 36px;
          }

          .back-btn {
            top: 14px;
            right: 14px;
            padding: 7px 13px;
            font-size: 13px;
          }

          .about-hero {
            margin-bottom: 36px;
          }

          .values-grid {
            grid-template-columns: 1fr;
            margin-bottom: 36px;
          }

          /* Scroll wrapper */
          .team-scroll-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 0 -14px;
            padding: 0 14px 12px;
            scrollbar-width: none;
          }

          .team-scroll-wrapper::-webkit-scrollbar {
            display: none;
          }

          .team-grid {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 12px;
            width: max-content;
          }

          .team-card {
            width: 185px;
            flex-shrink: 0;
            padding: 20px 16px;
            border-radius: 16px;
          }

          .team-card img {
            width: 82px;
            height: 82px;
          }

          .team-card h3 {
            font-size: 14px;
            margin: 8px 0 4px;
          }

          .team-card .role {
            font-size: 12px;
          }

          .team-card .focus {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="about-wrapper">
        <div className="about-container">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

          <section className="about-hero">
            <h1>About <span>Curelex</span></h1>
            <p>
              At Curelex, we are building a smarter, more connected healthcare ecosystem.
              Our mission is to make quality healthcare accessible, transparent, and continuous for everyone.
              By integrating technology with clinical expertise, we bridge the gap between patients,
              doctors, and healthcare infrastructure.
            </p>
          </section>

          <section className="values-grid">
            {VALUES.map(c => (
              <div key={c.title} className="value-card">
                <h2>{c.title}</h2>
                <p>{c.desc}</p>
              </div>
            ))}
          </section>

          <section className="team-section">
            <h2>Meet the Leadership</h2>
            <p>A multidisciplinary team driving innovation in healthcare.</p>
            <div className="team-scroll-wrapper">
              <div className="team-grid">
                {TEAM.map(m => (
                  <div key={m.name} className="team-card">
                    <img src={m.img} alt={m.name} />
                    <h3>{m.name}</h3>
                    <p className="role">{m.role}</p>
                    <p className="focus">{m.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <footer className="about-footer">
          <div>© 2026 Curelex. All rights reserved.</div>
        </footer>
      </div>
    </>
  )
}