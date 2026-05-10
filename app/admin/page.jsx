import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="container animate-fade-in" style={{ maxWidth: '1000px' }}>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Platform analytics and user management.</p>
        </div>
        <button className="btn btn-primary">Export Report</button>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '3rem' }}>
        <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Total Users</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>1,245</p>
          <span style={{ color: 'var(--success)', fontSize: '0.9rem' }}>+12% this month</span>
        </div>
        <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Active Trips Planned</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-color)' }}>8,432</p>
          <span style={{ color: 'var(--success)', fontSize: '0.9rem' }}>+5% this month</span>
        </div>
        <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Avg. Budget per Trip</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: '700', color: '#fbbf24' }}>$3,150</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Most Popular Destinations</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="flex-between" style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>1. Paris, France</span>
              <span style={{ fontWeight: '600' }}>1,204 Trips</span>
            </li>
            <li className="flex-between" style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>2. Tokyo, Japan</span>
              <span style={{ fontWeight: '600' }}>985 Trips</span>
            </li>
            <li className="flex-between" style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>3. Rome, Italy</span>
              <span style={{ fontWeight: '600' }}>850 Trips</span>
            </li>
            <li className="flex-between" style={{ padding: '1rem 0' }}>
              <span>4. Bali, Indonesia</span>
              <span style={{ fontWeight: '600' }}>720 Trips</span>
            </li>
          </ul>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <h3>Recent Users</h3>
            <Link href="#" style={{ color: 'var(--primary-color)', fontSize: '0.9rem' }}>View All</Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.5rem 0' }}>Name</th>
                <th style={{ padding: '0.5rem 0' }}>Joined</th>
                <th style={{ padding: '0.5rem 0', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>Alice Smith</td>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>Today</td>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', textAlign: 'right', color: 'var(--success)' }}>Active</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>Bob Jones</td>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>Yesterday</td>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', textAlign: 'right', color: 'var(--success)' }}>Active</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem 0' }}>Charlie Brown</td>
                <td style={{ padding: '1rem 0' }}>Oct 10</td>
                <td style={{ padding: '1rem 0', textAlign: 'right', color: 'var(--text-muted)' }}>Offline</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
