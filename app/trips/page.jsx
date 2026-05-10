"use client";

import Link from 'next/link';
import { useTrips } from '@/hooks/useTrips';

// TODO: Replace with real auth session userId before production
const DEMO_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID || "demo-user";

function formatDateRange(startDate, endDate) {
  if (!startDate && !endDate) {
    return 'Dates not set';
  }

  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }

  return startDate || endDate;
}

export default function MyTrips() {
  const { trips, loading, error, refetch } = useTrips(DEMO_USER_ID);

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
        {loading && (
          <div className="glass trip-card">
            <p style={{ color: 'var(--text-muted)' }}>Loading trips...</p>
          </div>
        )}

        {!loading && error && (
          <div className="glass trip-card">
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{error}</p>
            <button type="button" className="btn btn-outline" onClick={refetch}>Retry</button>
          </div>
        )}

        {!loading && !error && trips.map((trip) => (
          <div key={trip.id} className="glass trip-card">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary-color)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>Upcoming</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{formatDateRange(trip.start_date, trip.end_date)}</span>
            </div>
            <h3 className="trip-title">{trip.title}</h3>
            <p className="trip-meta">{trip.description || trip.destination || 'No description added yet.'}</p>
            <div className="flex-between" style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link href={`/trips/${trip.id}`} className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>View</Link>
                <Link href={`/trips/${trip.id}/edit`} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Edit</Link>
              </div>
            </div>
          </div>
        ))}

        {!loading && !error && trips.length === 0 && (
          <div className="glass trip-card">
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No trips found.</p>
            <Link href="/trips/new" className="btn btn-primary">Plan New Trip</Link>
          </div>
        )}
      </div>
    </div>
  );
}
