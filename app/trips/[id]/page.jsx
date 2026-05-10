"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getTripById } from '@/services/trip.service';

export default function ItineraryView({ params }) {
  const [activeTab, setActiveTab] = useState('trips');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [trip, setTrip] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getTripById(params.id)
      .then(setTrip)
      .catch((err) => {
        console.error('Failed to fetch trip:', err);
        setNotFound(true);
      });
  }, [params.id]);

  if (notFound) return <div>Trip not found</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const itinerary = [
    {
      day: 1,
      date: 'Oct 12',
      city: 'Paris',
      activities: [
        { time: '14:00', title: 'Check-in: Le Meurice', cost: '$850', type: 'Stay' },
        { time: '16:30', title: 'Eiffel Tower Sunset Tour', cost: '$45', type: 'Activity' },
        { time: '20:00', title: 'Dinner at Le Jules Verne', cost: '$250', type: 'Food' }
      ]
    },
    {
      day: 2,
      date: 'Oct 13',
      city: 'Paris',
      activities: [
        { time: '10:00', title: 'Louvre Museum Guided Tour', cost: '$65', type: 'Activity' },
        { time: '13:00', title: 'Lunch at Tuileries Garden', cost: '$40', type: 'Food' },
        { time: '15:30', title: 'Seine River Cruise', cost: '$30', type: 'Activity' }
      ]
    }
  ];

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
          --border: #f1f3f5;
          --radius-lg: 24px;
          --radius-md: 16px;
        }

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

        /* Sidebar */
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

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 260px;
          padding: 40px 60px;
          background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%);
          min-height: 100vh;
        }

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
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
        }

        .view-controls {
          display: flex;
          background: white;
          padding: 4px;
          border-radius: 100px;
          border: 1px solid var(--border);
        }

        .view-btn {
          padding: 8px 16px;
          border-radius: 100px;
          border: none;
          font-family: inherit;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: var(--text-muted);
        }

        .view-btn.active {
          background: var(--bg-peach);
          color: var(--primary);
        }

        .itinerary-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 40px;
        }

        /* Day Sidebar */
        .day-nav {
          position: sticky;
          top: 40px;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .day-nav-item {
          padding: 16px 20px;
          background: white;
          border-radius: var(--radius-md);
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .day-nav-item:hover {
          border-color: var(--primary);
        }

        .day-nav-item.active {
          background: var(--primary);
          color: white;
        }

        .day-label {
          font-weight: 700;
          font-size: 16px;
        }

        .day-date {
          font-size: 12px;
          opacity: 0.8;
        }

        /* Content Feed */
        .itinerary-feed {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .day-section {
          background: white;
          border-radius: var(--radius-lg);
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }

        .day-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 700;
        }

        .activity-block {
          display: flex;
          gap: 24px;
          position: relative;
          padding-bottom: 32px;
        }

        .activity-block:last-child {
          padding-bottom: 0;
        }

        .timeline-line {
          position: absolute;
          left: 15px;
          top: 32px;
          bottom: 0;
          width: 2px;
          background: var(--border);
        }

        .activity-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-peach);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          font-size: 14px;
        }

        .activity-content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .activity-time {
          font-weight: 700;
          font-size: 14px;
          color: var(--primary);
          margin-bottom: 4px;
        }

        .activity-name {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .activity-type {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .activity-cost {
          font-weight: 700;
          font-size: 16px;
        }

        .action-btns {
          display: flex;
          gap: 16px;
        }

        .btn-sm {
          padding: 8px 16px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-outline {
          border: 1px solid var(--border);
          color: var(--text-dark);
        }

        .btn-primary-sm {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 10px rgba(255, 107, 107, 0.2);
        }
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
            <Link href="/dashboard" className="nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
              Dashboard
            </Link>
            <Link href="/trips" className={`nav-item ${activeTab === 'trips' ? 'active' : ''}`}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              My Trips
            </Link>
            <Link href="/search" className="nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>
              Explore
            </Link>
          </nav>
        </aside>

        <main className="main-content">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.div variants={itemVariants} className="topbar">
              <div>
                <Link href="/trips" className="breadcrumb">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back to Trips
                </Link>
                <h1 className="page-title">{trip?.title || 'Paris Getaway'}</h1>
              </div>
              <div className="action-btns">
                <div className="view-controls">
                  <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>List</button>
                  <button className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`} onClick={() => setViewMode('calendar')}>Calendar</button>
                </div>
                <Link href={`/trips/${params.id}/edit`} className="btn-sm btn-outline">Edit Itinerary</Link>
                <Link href={`/trips/${params.id}/budget`} className="btn-sm btn-primary-sm">View Budget</Link>
              </div>
            </motion.div>

            <div className="itinerary-grid">
              {/* Day Selection Sidebar */}
              <motion.div variants={itemVariants} className="day-nav">
                {itinerary.map((day, i) => (
                  <div key={i} className={`day-nav-item ${i === 0 ? 'active' : ''}`}>
                    <div className="day-label">Day {day.day}</div>
                    <div className="day-date">{day.date}</div>
                  </div>
                ))}
                <div className="day-nav-item" style={{ justifyContent: 'center', borderStyle: 'dashed', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                  <span style={{ fontWeight: 700 }}>+ Add Day</span>
                </div>
              </motion.div>

              {/* Itinerary Feed */}
              <motion.div variants={itemVariants} className="itinerary-feed">
                {itinerary.map((day, i) => (
                  <div key={i} className="day-section">
                    <header className="day-header">
                      <div>
                        <h2 className="day-title">Day {day.day} • {day.city}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Wednesday, {day.date}</p>
                      </div>
                      <span style={{ background: 'var(--accent-green-bg)', color: 'var(--accent-green)', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700 }}>Active Day</span>
                    </header>

                    <div className="activities-list">
                      {day.activities.map((act, j) => (
                        <div key={j} className="activity-block">
                          {j < day.activities.length - 1 && <div className="timeline-line"></div>}
                          <div className="activity-icon">
                            {act.type === 'Stay' ? '🏨' : act.type === 'Food' ? '🍽️' : '🎡'}
                          </div>
                          <div className="activity-content">
                            <div>
                              <div className="activity-time">{act.time}</div>
                              <h3 className="activity-name">{act.title}</h3>
                              <div className="activity-type">{act.type} • Recommended 2h</div>
                            </div>
                            <div className="activity-cost">{act.cost}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
