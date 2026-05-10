"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDeleteTrip } from '@/hooks/useTripMutations';
import { useTrips } from '@/hooks/useTrips';
import { supabase } from '@/lib/supabase';

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

export default function MyTrips() {
  const router = useRouter();
  const [filter, setFilter] = useState('All Trips');
  const [userId, setUserId] = useState(DEMO_USER_ID);
  const { trips, loading, error, refetch } = useTrips(userId);
  const { deleteTrip, loading: deleteLoading, error: deleteError } = useDeleteTrip();
  const visibleTrips = useMemo(
    () => trips.filter((trip) => filter === 'All Trips' || (trip.status || 'Upcoming') === filter),
    [filter, trips],
  );

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

  async function handleDeleteTrip(id) {
    try {
      await deleteTrip(id);
      refetch();
    } catch (deleteTripError) {
      console.error('Failed to delete trip:', deleteTripError);
    }
  }

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
        :root {
          --bg-cream: #fffcf9;
          --bg-peach: #fff0e6;
          --text-dark: #2b2d42;
          --text-muted: #8d99ae;
          --primary: #ff6b6b;
          --primary-hover: #fa5252;
          --secondary: #a9a6ff;
          --accent-green: #0ca678;
          --border: #f1f3f5;
          --radius-lg: 24px;
          --radius-md: 16px;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; background-color: var(--bg-cream); color: var(--text-dark); }
        .dash-layout { display: flex; min-height: 100vh; }
        .sidebar { width: 260px; background: white; border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 32px 24px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 100; }
        .logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: var(--text-dark); text-decoration: none; display: flex; align-items: center; gap: 8px; margin-bottom: 48px; }
        .nav-item { display: flex; align-items: center; gap: 16px; padding: 14px 20px; border-radius: 12px; color: var(--text-muted); text-decoration: none; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-bottom: 8px; }
        .nav-item:hover { background: var(--bg-peach); color: var(--primary); }
        .nav-item.active { background: var(--primary); color: white; box-shadow: 0 10px 20px rgba(255, 107, 107, 0.2); }
        .sidebar-bottom { margin-top: auto; border-top: 1px solid var(--border); padding-top: 24px; }
        .main-content { flex: 1; margin-left: 260px; padding: 40px 60px; background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%); min-height: 100vh; }
        .topbar { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; gap: 24px; }
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 700; margin-bottom: 8px; line-height: 1.1; }
        .page-desc { color: var(--text-muted); font-size: 16px; }
        .filters-actions { display: flex; align-items: center; gap: 16px; }
        .filter-select { background: white; border: 1px solid var(--border); border-radius: 100px; padding: 10px 20px; font-family: inherit; font-weight: 600; color: var(--text-dark); outline: none; cursor: pointer; }
        .btn-primary { background: var(--primary); color: white; padding: 12px 24px; border-radius: 100px; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3); transition: transform 0.2s; border: none; cursor: pointer; }
        .btn-primary:hover { transform: translateY(-2px); background: var(--primary-hover); }
        .btn-secondary { background: white; color: var(--text-dark); padding: 12px 24px; border-radius: 100px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--border); cursor: pointer; }
        .trips-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .trip-card { background: white; border-radius: var(--radius-md); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: transform 0.3s, box-shadow 0.3s; display: flex; flex-direction: column; }
        .trip-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .trip-img-wrapper { position: relative; height: 200px; background: var(--bg-peach); }
        .trip-img { width: 100%; height: 100%; object-fit: cover; }
        .status-badge { position: absolute; top: 16px; left: 16px; padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; backdrop-filter: blur(10px); background: rgba(255,255,255,0.9); color: var(--primary); }
        .trip-body { padding: 24px; flex: 1; }
        .trip-name { font-size: 22px; font-weight: 700; margin-bottom: 16px; color: var(--text-dark); }
        .trip-detail { display: flex; align-items: center; gap: 12px; color: var(--text-muted); font-size: 14px; margin-bottom: 8px; }
        .trip-actions { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-top: 1px solid var(--border); background: #fdfdfd; }
        .action-group { display: flex; gap: 16px; }
        .action-btn { background: transparent; border: none; color: var(--text-muted); font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px; cursor: pointer; transition: color 0.2s; text-decoration: none; }
        .action-btn:hover, .action-btn.view { color: var(--primary); }
        .state-card { background: white; border-radius: var(--radius-md); padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
      `}} />

      <div className="dash-layout">
        <aside className="sidebar">
          <Link href="/" className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary)">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
            </svg>
            Traveloop
          </Link>
          <nav>
            <Link href="/dashboard" className="nav-item">Dashboard</Link>
            <Link href="/trips" className="nav-item active">My Trips</Link>
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
              <div>
                <h1 className="page-title">My Trips</h1>
                <p className="page-desc">Manage your upcoming itineraries and past adventures.</p>
              </div>
              <div className="filters-actions">
                <select className="filter-select" value={filter} onChange={(event) => setFilter(event.target.value)}>
                  <option>All Trips</option>
                  <option>Upcoming</option>
                </select>
                <Link href="/trips/new" className="btn-primary">New Trip</Link>
              </div>
            </motion.div>

            {loading && <motion.div variants={itemVariants} className="state-card">Loading trips...</motion.div>}

            {!loading && error && (
              <motion.div variants={itemVariants} className="state-card">
                <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>{error}</p>
                <button type="button" className="btn-secondary" onClick={refetch}>Retry</button>
              </motion.div>
            )}

            {deleteError && (
              <motion.div variants={itemVariants} className="state-card">
                <p style={{ color: 'var(--text-muted)' }}>{deleteError}</p>
              </motion.div>
            )}

            {!loading && !error && trips.length === 0 && (
              <motion.div variants={itemVariants} className="state-card">
                <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>No trips found.</p>
                <Link href="/trips/new" className="btn-primary">Plan New Trip</Link>
              </motion.div>
            )}

            {!loading && !error && trips.length > 0 && (
              <motion.div variants={itemVariants} className="trips-grid">
                {visibleTrips.map((trip) => (
                  <div key={trip.id} className="trip-card">
                    <div className="trip-img-wrapper">
                      <img src={`https://source.unsplash.com/600x400/?${encodeURIComponent(trip.destination || trip.title || 'travel')}`} alt={trip.title} className="trip-img" />
                      <div className="status-badge">Upcoming</div>
                    </div>
                    <div className="trip-body">
                      <h3 className="trip-name">{trip.title}</h3>
                      <div className="trip-detail">{formatDateRange(trip.start_date, trip.end_date)}</div>
                      <div className="trip-detail">{trip.description || trip.destination || 'No description added yet.'}</div>
                    </div>
                    <div className="trip-actions">
                      <Link href={`/trips/${trip.id}`} className="action-btn view">View</Link>
                      <div className="action-group">
                        <Link href={`/trips/${trip.id}/edit`} className="action-btn">Edit</Link>
                        <button type="button" className="action-btn" onClick={() => handleDeleteTrip(trip.id)} disabled={deleteLoading}>
                          {deleteLoading ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </>
  );
}
