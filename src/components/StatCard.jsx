function StatCard({
  title,
  value,
  change,
  icon: Icon,
}) {
  return (
    <div className="dashboard-stat-card">

      <div className="stat-card-top">

        <div className="stat-card-icon">
          <Icon size={20} />
        </div>

        {change && (
          <span className="stat-card-change">
            {change}
          </span>
        )}

      </div>

      <strong className="stat-card-value">
        {value}
      </strong>

      <span className="stat-card-title">
        {title}
      </span>

    </div>
  );
}

export default StatCard;