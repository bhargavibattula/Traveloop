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

export default function Dashboard() {
  const { trips, loading, error, refetch } = useTrips(DEMO_USER_ID);
  const upcomingTrips = trips.slice(0, 3);

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

        {!loading && !error && upcomingTrips.map((trip) => (
          <div key={trip.id} className="glass trip-card">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary-color)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>Upcoming</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{formatDateRange(trip.start_date, trip.end_date)}</span>
            </div>
            <h3 className="trip-title">{trip.title}</h3>
            <p className="trip-meta">{trip.description || trip.destination || 'No description added yet.'}</p>
            <div className="flex-between" style={{ marginTop: '2rem' }}>
              <span style={{ fontWeight: '600' }}>Saved Trip</span>
              <Link href={`/trips/${trip.id}`} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>View Plan</Link>
            </div>
          </div>
        ))}

        {!loading && !error && upcomingTrips.length === 0 && (
          <div className="glass trip-card">
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No trips planned yet.</p>
            <Link href="/trips/new" className="btn btn-primary">Start Planning</Link>
          </div>
        )}

        <div className="glass trip-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Ready for your next adventure?</p>
          <Link href="/trips/new" className="btn btn-primary">Start Planning</Link>
        </div>
      </div>

      <h2 style={{ marginTop: '4rem', marginBottom: '1rem' }}>Popular Destinations</h2>
      <div className="dashboard-grid">
        {['Kyoto, Japan', 'Bali, Indonesia', 'Santorini, Greece', 'Banff, Canada'].map((dest) => (
          <div key={dest} className="glass trip-card" style={{ padding: '2rem 1.5rem', textAlign: 'center', background: `linear-gradient(rgba(30,41,59,0.8), rgba(30,41,59,0.9)), url('https://source.unsplash.com/400x300/?${dest.split(',')[0]}') center/cover` }}>
            <h3 style={{ fontSize: '1.5rem' }}>{dest}</h3>
            <button className="btn btn-outline" style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.5)' }}>Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
}
