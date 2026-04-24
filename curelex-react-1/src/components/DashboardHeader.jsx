import { Link } from 'react-router-dom'

export default function DashboardHeader({ backTo = '/', backLabel = 'Back to Home', rightContent }) {
  return (
    <header className="dashboard-header-fixed">
      <div className="header-container">
        <Link to={backTo} className="back-home">
          <i className="fas fa-arrow-left"></i> {backLabel}
        </Link>
        <div className="header-user">
          {rightContent}
        </div>
      </div>
    </header>
  )
}