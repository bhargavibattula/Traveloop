"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTrips } from '@/hooks/useTrips';

// TODO: Replace with real auth session userId before production
const DEMO_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID || '11111111-1111-1111-1111-111111111111';

function formatDateRange(startDate, endDate) {
  if (!startDate && !endDate) {
    return 'Dates not set';
  }

  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }

  return startDate || endDate;
}

export default function UserDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userId, setUserId] = useState(DEMO_USER_ID);
  const { trips, loading, error, refetch } = useTrips(userId);
  const upcomingTrips = trips.slice(0, 3);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();

      if (mounted && user?.id) {
        setUserId(user.id);
      }
    }

    void loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleLogout(event) {
    event.preventDefault();

    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      console.error('Logout error:', logoutError.message);
      return;
    }

    router.push('/login');
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root { --bg-cream:#fffcf9; --bg-peach:#fff0e6; --text-dark:#2b2d42; --text-muted:#8d99ae; --primary:#ff6b6b; --primary-hover:#fa5252; --secondary:#a9a6ff; --accent-green:#e6fcf5; --border:#f1f3f5; --radius-md:16px; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; background-color: var(--bg-cream); color: var(--text-dark); }
        .dash-layout { display: flex; min-height: 100vh; }
        .sidebar { width: 260px; background: white; border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 32px 24px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 100; }
        .logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: var(--text-dark); text-decoration: none; display: flex; align-items: center; gap: 8px; margin-bottom: 48px; }
        .nav-item { display: flex; align-items: center; gap: 16px; padding: 14px 20px; border-radius: 12px; color: var(--text-muted); text-decoration: none; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-bottom: 8px; }
        .nav-item:hover { background: var(--bg-peach); color: var(--primary); }
        .nav-item.active { background: var(--primary); color: white; box-shadow: 0 10px 20px rgba(255,107,107,0.2); }
        .sidebar-bottom { margin-top: auto; border-top: 1px solid var(--border); padding-top: 24px; }
        .main-content { flex: 1; margin-left: 260px; padding: 40px 60px; background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%); min-height: 100vh; }
        .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 48px; }
        .welcome-text h1 { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 700; margin-bottom: 4px; }
        .welcome-text p { color: var(--text-muted); font-size: 16px; }
        .btn-new-trip, .btn-primary { background: var(--primary); color: white; padding: 12px 24px; border-radius: 100px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(255,107,107,0.3); transition: transform 0.2s; border: none; cursor: pointer; }
        .btn-new-trip:hover, .btn-primary:hover { transform: translateY(-2px); background: var(--primary-hover); }
        .btn-secondary { background: white; color: var(--text-dark); padding: 10px 18px; border-radius: 100px; font-weight: 600; text-decoration: none; display: inline-flex; border: 1px solid var(--border); cursor: pointer; }
        .budget-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 48px; }
        .stat-card, .state-card { background: white; padding: 24px; border-radius: var(--radius-md); box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
        .stat-title { color: var(--text-muted); font-size: 14px; font-weight: 600; }
        .stat-value { font-size: 28px; font-weight: 800; color: var(--text-dark); font-family: 'Cormorant Garamond', serif; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .section-title { font-size: 24px; font-weight: 700; }
        .view-all { color: var(--primary); font-weight: 600; text-decoration: none; font-size: 14px; }
        .trips-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 48px; }
        .trip-card { background: white; border-radius: var(--radius-md); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: transform 0.3s; text-decoration: none; color: inherit; display: block; }
        .trip-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .trip-img { width: 100%; height: 160px; object-fit: cover; background: var(--bg-peach); }
        .trip-info { padding: 20px; }
        .trip-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 12px; font-weight: 600; color: var(--text-muted); }
        .trip-status { background: var(--bg-peach); color: var(--primary); padding: 4px 12px; border-radius: 100px; }
        .trip-name { font-size: 20px; font-weight: 700; margin-bottom: 16px; }
        .reco-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .reco-card { position: relative; height: 250px; border-radius: var(--radius-md); overflow: hidden; }
        .reco-card img { width: 100%; height: 100%; object-fit: cover; }
        .reco-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; color: white; }
      `}} />

      <div className="dash-layout">
        <aside className="sidebar">
          <Link href="/" className="logo">Traveloop</Link>
          <nav>
            <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</div>
            <Link href="/trips" className="nav-item">My Trips</Link>
            <Link href="/search" className="nav-item">Explore</Link>
            <Link href="/trips/1/budget" className="nav-item">Budgets</Link>
          </nav>
          <div className="sidebar-bottom">
            <Link href="/profile" className="nav-item">Settings</Link>
            <Link href="/login" className="nav-item" style={{ color: '#ff6b6b' }} onClick={handleLogout}>Log Out</Link>
          </div>
        </aside>

        <main className="main-content">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.div variants={itemVariants} className="topbar">
              <div className="welcome-text">
                <h1>Good morning, Alex</h1>
                <p>{loading ? 'Loading your trips...' : `You have ${trips.length} saved trip${trips.length === 1 ? '' : 's'}.`}</p>
              </div>
              <Link href="/trips/new" className="btn-new-trip">Plan New Trip</Link>
            </motion.div>

            <motion.div variants={itemVariants} className="budget-grid">
              <div className="stat-card"><div className="stat-title">Saved Trips</div><div className="stat-value">{trips.length}</div></div>
              <div className="stat-card"><div className="stat-title">Upcoming Trips</div><div className="stat-value">{upcomingTrips.length}</div></div>
              <div className="stat-card"><div className="stat-title">Demo Mode</div><div className="stat-value">On</div></div>
              <div className="stat-card"><div className="stat-title">Data Source</div><div className="stat-value">Live</div></div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="section-header">
                <h2 className="section-title">Recent Trips</h2>
                <Link href="/trips" className="view-all">View All Trips &rarr;</Link>
              </div>

              {loading && <div className="state-card">Loading trips...</div>}

              {!loading && error && (
                <div className="state-card">
                  <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>{error}</p>
                  <button type="button" className="btn-secondary" onClick={refetch}>Retry</button>
                </div>
              )}

              {!loading && !error && upcomingTrips.length === 0 && (
                <div className="state-card">
                  <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>No trips planned yet.</p>
                  <Link href="/trips/new" className="btn-primary">Start Planning</Link>
                </div>
              )}

              {!loading && !error && upcomingTrips.length > 0 && (
                <div className="trips-grid">
                  {upcomingTrips.map((trip) => (
                    <Link key={trip.id} href={`/trips/${trip.id}`} className="trip-card">
                      <img src={`https://source.unsplash.com/600x400/?${encodeURIComponent(trip.destination || trip.title || 'travel')}`} alt={trip.title} className="trip-img" />
                      <div className="trip-info">
                        <div className="trip-meta">
                          <span className="trip-status">Upcoming</span>
                          <span>{formatDateRange(trip.start_date, trip.end_date)}</span>
                        </div>
                        <h3 className="trip-name">{trip.title}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{trip.description || trip.destination || 'No description added yet.'}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="section-header"><h2 className="section-title">Inspiration for your next journey</h2></div>
              <div className="reco-grid">
                {['Amalfi Coast, Italy', 'Dubai, UAE', 'Yosemite, USA', 'Kyoto, Japan'].map((destination) => (
                  <div key={destination} className="reco-card">
                    <img src={`https://source.unsplash.com/600x400/?${encodeURIComponent(destination)}`} alt={destination} />
                    <div className="reco-overlay"><h3 style={{ fontSize: '20px' }}>{destination}</h3></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
