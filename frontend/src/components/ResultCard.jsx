function ResultCard({ title, badgeText, badgeType = "info", children }) {
  return (
    <div className="glass-card">
      <div className="result-header">
        <h3 className="card-title" style={{ marginBottom: 0 }}>{title}</h3>
        {badgeText && (
          <span className={`result-badge ${badgeType}`}>
            {badgeText}
          </span>
        )}
      </div>
      <div className="result-body">
        {children}
      </div>
    </div>
  );
}

export default ResultCard;
