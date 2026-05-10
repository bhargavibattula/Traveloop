import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="container animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back! Here is an overview of your travels.</p>
        </div>
        <Link href="/trips/new" className="btn btn-primary">
          + Plan New Trip
        </Link>
      </div>

      <h2 style={{ marginTop: '3rem', marginBottom: '1rem' }}>Upcoming Trips</h2>
      <div className="dashboard-grid">
        <div className="glass trip-card">
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary-color)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>Upcoming</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Oct 12 - Oct 25</span>
          </div>
          <h3 className="trip-title">Euro Trip 2026</h3>
          <p className="trip-meta">Paris • Amsterdam • Berlin</p>
          <div className="flex-between" style={{ marginTop: '2rem' }}>
            <span style={{ fontWeight: '600' }}>$2,450 Est.</span>
            <Link href="/trips/1" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>View Plan</Link>
          </div>
        </div>

        <div className="glass trip-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Ready for your next adventure?</p>
          <Link href="/trips/new" className="btn btn-primary">Start Planning</Link>
        </div>
      </div>

      <h2 style={{ marginTop: '4rem', marginBottom: '1rem' }}>Popular Destinations</h2>
      <div className="dashboard-grid">
        {['Kyoto, Japan', 'Bali, Indonesia', 'Santorini, Greece', 'Banff, Canada'].map((dest, i) => (
          <div key={i} className="glass trip-card" style={{ padding: '2rem 1.5rem', textAlign: 'center', background: `linear-gradient(rgba(30,41,59,0.8), rgba(30,41,59,0.9)), url('https://source.unsplash.com/400x300/?${dest.split(',')[0]}') center/cover` }}>
            <h3 style={{ fontSize: '1.5rem' }}>{dest}</h3>
            <button className="btn btn-outline" style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.5)' }}>Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
}
