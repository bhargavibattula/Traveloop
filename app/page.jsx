import Link from 'next/link';

export default function Home() {
  return (
    <div className="container animate-fade-in" style={{ textAlign: 'center', paddingTop: '10vh' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Plan Your Dream Trip
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
        Traveloop is a personalized, intelligent, and collaborative platform that transforms the way you plan and experience travel.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link href="/trips/new" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
          Start Planning
        </Link>
        <Link href="/dashboard" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
          Explore Destinations
        </Link>
      </div>

      <div className="dashboard-grid" style={{ marginTop: '5rem', textAlign: 'left' }}>
        <div className="glass trip-card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Multi-City Itineraries</h3>
          <p style={{ color: 'var(--text-muted)' }}>Easily add and manage travel stops, durations, and activities.</p>
        </div>
        <div className="glass trip-card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>Smart Budgeting</h3>
          <p style={{ color: 'var(--text-muted)' }}>Estimate trip budgets automatically and track expenses.</p>
        </div>
        <div className="glass trip-card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--success)' }}>Collaborate & Share</h3>
          <p style={{ color: 'var(--text-muted)' }}>Share your trip plans with friends or make them public.</p>
        </div>
      </div>
    </div>
  );
}
