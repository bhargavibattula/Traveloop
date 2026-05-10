"use client";

import React, { useState } from 'react';
import Link from 'next/link';
<<<<<<< HEAD
import { motion } from 'framer-motion';

export default function MyTrips() {
  const [activeTab, setActiveTab] = useState('trips');
  const [filter, setFilter] = useState('All Trips');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const trips = [
    { id: 1, name: 'Summer in Japan 2026', dates: 'Aug 12 - Aug 25, 2026', destinations: 3, status: 'Upcoming', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600' },
    { id: 2, name: 'Paris Getaway', dates: 'Oct 05 - Oct 12, 2026', destinations: 1, status: 'Upcoming', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=600' },
    { id: 3, name: 'Amalfi Coast Roadtrip', dates: 'Jun 10 - Jun 18, 2025', destinations: 4, status: 'Completed', img: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=600' },
    { id: 4, name: 'Bali Retreat', dates: 'Jan 15 - Jan 22, 2025', destinations: 2, status: 'Completed', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600' },
  ];

=======
import { getTrips } from '@/services/trip.service';

export default async function MyTrips() {
  let trips = [];
  const userId = 'placeholder-user-id'; // TODO: replace with real auth userId

  try {
    trips = await getTrips(userId);
  } catch (err) {
    console.error('Failed to fetch trips:', err);
  }

>>>>>>> 18941affa080c098e7c96197d5d353b9c0b2756b
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
          --accent-green-bg: #e6fcf5;
          --border: #f1f3f5;
          --radius-lg: 24px;
          --radius-md: 16px;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

<<<<<<< HEAD
        body {
          font-family: 'Outfit', sans-serif;
          background-color: var(--bg-cream);
          color: var(--text-dark);
        }

        .dash-layout {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar (Same as Dashboard) */
        .sidebar {
          width: 260px;
          background: white;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 32px 24px;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
        }

        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--text-dark);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 48px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          border-radius: 12px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
          cursor: pointer;
          margin-bottom: 8px;
        }

        .nav-item:hover {
          background: var(--bg-peach);
          color: var(--primary);
        }

        .nav-item.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 10px 20px rgba(255, 107, 107, 0.2);
        }

        .sidebar-bottom {
          margin-top: auto;
          border-top: 1px solid var(--border);
          padding-top: 24px;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 260px;
          padding: 40px 60px;
          background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%);
          min-height: 100vh;
        }

        /* Topbar specific to My Trips */
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 1.1;
        }

        .page-desc {
          color: var(--text-muted);
          font-size: 16px;
        }

        .filters-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-bar {
          background: white;
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 250px;
        }

        .search-bar input {
          border: none;
          outline: none;
          font-family: inherit;
          width: 100%;
          color: var(--text-dark);
          font-size: 14px;
        }

        .filter-select {
          background: white;
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 10px 20px;
          font-family: inherit;
          font-weight: 600;
          color: var(--text-dark);
          outline: none;
          cursor: pointer;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 12px 24px;
          border-radius: 100px;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
          transition: transform 0.2s;
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          background: var(--primary-hover);
        }

        /* Trips Grid */
        .trips-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .trip-card {
          background: white;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
        }

        .trip-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .trip-img-wrapper {
          position: relative;
          height: 200px;
        }

        .trip-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .status-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .status-upcoming {
          background: rgba(255, 255, 255, 0.9);
          color: var(--primary);
        }

        .status-completed {
          background: rgba(12, 166, 120, 0.9);
          color: white;
        }

        .trip-body {
          padding: 24px;
          flex: 1;
        }

        .trip-name {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--text-dark);
        }

        .trip-detail {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .trip-detail-icon {
          color: var(--secondary);
        }

        .trip-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-top: 1px solid var(--border);
          background: #fdfdfd;
        }

        .action-group {
          display: flex;
          gap: 16px;
        }

        .action-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: none;
        }

        .action-btn:hover { color: var(--primary); }
        .action-btn.view { color: var(--text-dark); }
        .action-btn.view:hover { color: var(--primary); }
        .action-btn.delete:hover { color: #fa5252; }

      `}} />

      <div className="dash-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <Link href="/" className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary)">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
            </svg>
            Traveloop
          </Link>

          <nav>
            <Link href="/dashboard" className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
              Dashboard
            </Link>
            <Link href="/trips" className={`nav-item ${activeTab === 'trips' ? 'active' : ''}`} onClick={() => setActiveTab('trips')}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              My Trips
            </Link>
            <Link href="/search" className="nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>
              Explore
            </Link>
            <Link href="/trips/1/budget" className="nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              Budgets
            </Link>
          </nav>

          <div className="sidebar-bottom">
            <Link href="/profile" className="nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              Settings
            </Link>
            <Link href="/" className="nav-item" style={{ color: '#ff6b6b' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Log Out
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            
            <motion.div variants={itemVariants} className="topbar">
              <div>
                <h1 className="page-title">My Trips</h1>
                <p className="page-desc">Manage your upcoming itineraries and past adventures.</p>
              </div>
              <div className="filters-actions">
                <div className="search-bar">
                  <svg width="18" height="18" fill="none" stroke="var(--text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                  <input type="text" placeholder="Search trips..." />
                </div>
                <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option>All Trips</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                </select>
                <Link href="/trips/new" className="btn-primary">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  New Trip
                </Link>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="trips-grid">
              {trips.filter(t => filter === 'All Trips' || t.status === filter).map(trip => (
                <div key={trip.id} className="trip-card">
                  <div className="trip-img-wrapper">
                    <img src={trip.img} alt={trip.name} className="trip-img" />
                    <div className={`status-badge ${trip.status === 'Upcoming' ? 'status-upcoming' : 'status-completed'}`}>
                      {trip.status}
                    </div>
                  </div>
                  
                  <div className="trip-body">
                    <h3 className="trip-name">{trip.name}</h3>
                    
                    <div className="trip-detail">
                      <svg className="trip-detail-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {trip.dates}
                    </div>
                    
                    <div className="trip-detail">
                      <svg className="trip-detail-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {trip.destinations} Destination{trip.destinations > 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="trip-actions">
                    <Link href={`/trips/${trip.id}`} className="action-btn view">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      View
                    </Link>
                    <div className="action-group">
                      <Link href={`/trips/${trip.id}/edit`} className="action-btn edit">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Edit
                      </Link>
                      <button className="action-btn delete">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </main>
=======
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
>>>>>>> 18941affa080c098e7c96197d5d353b9c0b2756b
      </div>
    </>
  );
}
