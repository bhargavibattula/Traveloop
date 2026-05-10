"use client";

import React, { useState } from 'react';
import Link from 'next/link';
<<<<<<< HEAD
import { motion } from 'framer-motion';

export default function ItineraryBuilder({ params }) {
  const [activeTab, setActiveTab] = useState('trips');
  const [searchTab, setSearchTab] = useState('activities');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
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
          --border: #e9ecef;
          --input-bg: #f8f9fa;
          --radius-lg: 24px;
          --radius-md: 16px;
        }
=======
import { getTripById, updateTrip } from '@/services/trip.service';

export default async function ItineraryBuilder({ params }) {
  let trip = null;

  try {
    trip = await getTripById(params.id);
  } catch (err) {
    console.error('Failed to fetch trip:', err);
  }

  if (!trip) return <div>Trip not found</div>;

  async function saveTrip(formData) {
    'use server';

    await updateTrip(params.id, {
      title: formData.get('title')?.toString() || '',
    });
  }

  return (
    <form action={saveTrip}>
    <input type="hidden" name="title" value={trip.title || ''} />
    <div className="container animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <Link href={`/trips/${trip.id}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>← Back to Itinerary</Link>
          <h1 className="page-title">Builder: {trip.title}</h1>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </div>
>>>>>>> 18941affa080c098e7c96197d5d353b9c0b2756b

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

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

        /* Topbar */
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 8px;
          transition: color 0.2s;
        }

        .breadcrumb:hover { color: var(--primary); }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          line-height: 1.1;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 12px 28px;
          border-radius: 100px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
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

        /* Builder Layout */
        .builder-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
        }

        /* Left Pane: Timeline */
        .timeline-section {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .stop-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          position: relative;
        }

        .stop-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }

        .stop-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 4px;
        }

        .stop-dates {
          color: var(--text-muted);
          font-size: 14px;
          font-weight: 500;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid var(--border);
          padding: 8px 16px;
          border-radius: 100px;
          color: var(--text-dark);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-outline:hover { background: var(--input-bg); }

        .drop-zone {
          border: 2px dashed #ced4da;
          background: var(--input-bg);
          border-radius: var(--radius-md);
          padding: 32px;
          text-align: center;
          margin-bottom: 24px;
          transition: all 0.2s;
        }

        .drop-zone:hover {
          border-color: var(--primary);
          background: #fff5f5;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--input-bg);
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 12px;
          border: 1px solid var(--border);
        }

        .drag-handle {
          cursor: grab;
          color: #adb5bd;
        }

        .activity-input {
          border: 1px solid var(--border);
          background: white;
          padding: 10px 16px;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          color: var(--text-dark);
          outline: none;
        }

        .activity-input:focus { border-color: var(--secondary); }
        .activity-time { width: 100px; }
        .activity-title { flex: 1; }
        .activity-cost { width: 100px; }

        .delete-btn {
          background: none;
          border: none;
          color: #fa5252;
          cursor: pointer;
          padding: 8px;
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        .delete-btn:hover { opacity: 1; }

        .btn-dashed {
          width: 100%;
          background: transparent;
          border: 2px dashed var(--primary);
          color: var(--primary);
          padding: 20px;
          border-radius: var(--radius-lg);
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-dashed:hover {
          background: rgba(255, 107, 107, 0.05);
        }

        /* Right Pane: Search/Discover */
        .discover-panel {
          background: white;
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          height: fit-content;
          position: sticky;
          top: 40px;
        }

        .discover-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          background: var(--input-bg);
          padding: 4px;
          border-radius: 100px;
        }

        .discover-tab {
          flex: 1;
          text-align: center;
          padding: 8px 0;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .discover-tab.active {
          background: white;
          color: var(--text-dark);
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .search-input {
          width: 100%;
          background: var(--input-bg);
          border: 1px solid var(--border);
          padding: 12px 20px;
          border-radius: 100px;
          font-family: inherit;
          font-size: 14px;
          outline: none;
          margin-bottom: 24px;
          display: flex;
        }

        .search-input:focus { border-color: var(--primary); }

        .discover-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .discover-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          transition: border-color 0.2s;
        }

        .discover-card:hover { border-color: var(--secondary); }

        .discover-card-img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .discover-card-title {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .discover-card-meta {
          color: var(--text-muted);
          font-size: 12px;
          margin-bottom: 12px;
        }

        .btn-add-trip {
          width: 100%;
          background: var(--input-bg);
          color: var(--primary);
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-add-trip:hover { background: #fff5f5; }

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
            <Link href="/dashboard" className="nav-item">
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
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            
            <motion.div variants={itemVariants} className="topbar">
              <div>
                <Link href="/trips" className="breadcrumb">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back to Trips
                </Link>
                <h1 className="page-title">Builder: Paris Getaway</h1>
              </div>
              <button className="btn-primary">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Save Itinerary
              </button>
            </motion.div>

            <div className="builder-layout">
              {/* Left Pane: Timeline Builder */}
              <motion.div variants={itemVariants} className="timeline-section">
                
                {/* Stop 1 */}
                <div className="stop-card">
                  <div className="stop-header">
                    <div>
                      <h2 className="stop-title">Paris, France</h2>
                      <div className="stop-dates">Oct 12 - Oct 15 • 3 Nights</div>
                    </div>
                    <button className="btn-outline">Edit Stop</button>
                  </div>

                  <div className="drop-zone">
                    <div style={{ color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 500 }}>
                      Drag and drop activities here or add manually.
                    </div>
                    <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
                      + Add Activity
                    </button>
                  </div>

                  <div className="activity-item">
                    <div className="drag-handle">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
                    </div>
                    <input type="time" defaultValue="14:00" className="activity-input activity-time" />
                    <input type="text" defaultValue="Check-in to Le Meurice" className="activity-input activity-title" />
                    <input type="number" defaultValue="0" className="activity-input activity-cost" placeholder="Cost ($)" />
                    <button className="delete-btn">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>

                  <div className="activity-item">
                    <div className="drag-handle">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
                    </div>
                    <input type="time" defaultValue="16:30" className="activity-input activity-time" />
                    <input type="text" defaultValue="Eiffel Tower Sunset Tour" className="activity-input activity-title" />
                    <input type="number" defaultValue="45" className="activity-input activity-cost" placeholder="Cost ($)" />
                    <button className="delete-btn">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                </div>

                <button className="btn-dashed">
                  + Add Another Destination
                </button>
              </motion.div>

              {/* Right Pane: Discover Search */}
              <motion.div variants={itemVariants} className="discover-panel">
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Discover</h3>
                
                <div className="discover-tabs">
                  <div className={`discover-tab ${searchTab === 'activities' ? 'active' : ''}`} onClick={() => setSearchTab('activities')}>Activities</div>
                  <div className={`discover-tab ${searchTab === 'places' ? 'active' : ''}`} onClick={() => setSearchTab('places')}>Places</div>
                  <div className={`discover-tab ${searchTab === 'hotels' ? 'active' : ''}`} onClick={() => setSearchTab('hotels')}>Hotels</div>
                </div>

                <input type="text" className="search-input" placeholder={`Search ${searchTab} in Paris...`} />

                <div className="discover-list">
                  <div className="discover-card">
                    <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400" alt="Louvre" className="discover-card-img" />
                    <h4 className="discover-card-title">Louvre Museum</h4>
                    <div className="discover-card-meta">Art Museum • 3-4 hours • $22</div>
                    <button className="btn-add-trip">+ Add to Itinerary</button>
                  </div>
                  
                  <div className="discover-card">
                    <img src="https://images.unsplash.com/photo-1511739001486-6bfe10ce745f?auto=format&fit=crop&q=80&w=400" alt="Arc de Triomphe" className="discover-card-img" />
                    <h4 className="discover-card-title">Arc de Triomphe</h4>
                    <div className="discover-card-meta">Landmark • 1-2 hours • $15</div>
                    <button className="btn-add-trip">+ Add to Itinerary</button>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </main>
      </div>
<<<<<<< HEAD
    </>
=======
    </div>
    </form>
>>>>>>> 18941affa080c098e7c96197d5d353b9c0b2756b
  );
}
