import Link from 'next/link';
import { getTrips } from '@/services/trip.service';

export default async function MyTrips() {
  let trips = [];
  const userId = 'placeholder-user-id'; // TODO: replace with real auth userId

  try {
    trips = await getTrips(userId);
  } catch (err) {
    console.error('Failed to fetch trips:', err);
  }

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
        {trips.map((trip) => (
          <div key={trip.id} className="glass trip-card">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary-color)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>Upcoming</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{trip.start_date || 'TBD'} - {trip.end_date || 'TBD'}</span>
            </div>
            <h3 className="trip-title">{trip.title}</h3>
            <p className="trip-meta">{trip.description || trip.destination || 'No description yet'}</p>
            <div className="flex-between" style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link href={`/trips/${trip.id}`} className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>View</Link>
                <Link href={`/trips/${trip.id}/edit`} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
