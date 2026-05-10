import Link from 'next/link';

export default function MyTrips() {
  return (
    <div className="container animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">My Trips</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage all your past and upcoming travels.</p>
        </div>
        <Link href="/trips/new" className="btn btn-primary">
          + Plan New Trip
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn btn-primary" style={{ borderRadius: '2rem' }}>Upcoming</button>
        <button className="btn btn-outline" style={{ borderRadius: '2rem' }}>Past Trips</button>
        <button className="btn btn-outline" style={{ borderRadius: '2rem' }}>Drafts</button>
      </div>

      <div className="dashboard-grid">
        <div className="glass trip-card">
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary-color)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>Upcoming</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Oct 12 - Oct 25</span>
          </div>
          <h3 className="trip-title">Euro Trip 2026</h3>
          <p className="trip-meta">Paris • Amsterdam • Berlin</p>
          <div className="flex-between" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link href="/trips/1" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>View</Link>
              <Link href="/trips/1/edit" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Edit</Link>
            </div>
          </div>
        </div>

        <div className="glass trip-card" style={{ opacity: 0.7 }}>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <span style={{ background: 'rgba(148, 163, 184, 0.2)', color: 'var(--text-muted)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>Past</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Jan 5 - Jan 15</span>
          </div>
          <h3 className="trip-title">Winter in Hokkaido</h3>
          <p className="trip-meta">Sapporo • Niseko</p>
          <div className="flex-between" style={{ marginTop: '2rem' }}>
            <Link href="/trips/2" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', width: '100%' }}>View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
