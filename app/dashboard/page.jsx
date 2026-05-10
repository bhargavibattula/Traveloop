"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function UserDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  async function handleLogout(event) {
    event.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error.message);
      return;
    }

    router.push('/login');
  }

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
          --accent-green: #e6fcf5;
          --accent-yellow: #fff9db;
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

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
        }

        .welcome-text h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .welcome-text p {
          color: var(--text-muted);
          font-size: 16px;
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .btn-new-trip {
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

        .btn-new-trip:hover {
          transform: translateY(-2px);
          background: var(--primary-hover);
        }

        .profile-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--border);
          object-fit: cover;
        }

        /* Budget Highlights */
        .budget-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: var(--radius-md);
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .stat-title {
          color: var(--text-muted);
          font-size: 14px;
          font-weight: 600;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-dark);
          font-family: 'Cormorant Garamond', serif;
        }

        /* Recent Trips */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
        }

        .view-all {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          font-size: 14px;
        }

        .trips-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .trip-card {
          background: white;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: transform 0.3s;
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .trip-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .trip-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .trip-info {
          padding: 20px;
        }

        .trip-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .trip-status {
          background: var(--bg-peach);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: 100px;
        }

        .trip-name {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .trip-progress-bg {
          width: 100%;
          height: 6px;
          background: var(--border);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .trip-progress-fill {
          height: 100%;
          background: var(--secondary);
          border-radius: 10px;
        }

        /* Recommendations */
        .reco-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .reco-card {
          position: relative;
          height: 250px;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
        }

        .reco-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .reco-card:hover img {
          transform: scale(1.1);
        }

        .reco-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          color: white;
        }

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
            <Link href="/search" className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`} onClick={() => setActiveTab('explore')}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>
              Explore
            </Link>
            <Link href="/trips/1/budget" className={`nav-item ${activeTab === 'budget' ? 'active' : ''}`} onClick={() => setActiveTab('budget')}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              Budgets
            </Link>
          </nav>

          <div className="sidebar-bottom">
            <Link href="/profile" className="nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              Settings
            </Link>
            <Link href="/login" className="nav-item" style={{ color: '#ff6b6b' }} onClick={handleLogout}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Log Out
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            
            <motion.div variants={itemVariants} className="topbar">
              <div className="welcome-text">
                <h1>Good morning, Alex ✈️</h1>
                <p>You have 1 upcoming trip in 12 days. Ready to pack?</p>
              </div>
              <div className="topbar-actions">
                <Link href="/trips/new" className="btn-new-trip">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Plan New Trip
                </Link>
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" alt="Profile" className="profile-avatar" />
              </div>
            </motion.div>

            {/* Budget Highlights */}
            <motion.div variants={itemVariants} className="budget-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'var(--bg-peach)', color: 'var(--primary)' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                </div>
                <div className="stat-title">Total Travel Budget</div>
                <div className="stat-value">$12,450</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fff0f0', color: '#ff6b6b' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                </div>
                <div className="stat-title">Total Spent</div>
                <div className="stat-value">$4,200</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'var(--accent-green)', color: '#0ca678' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="stat-title">Budget Remaining</div>
                <div className="stat-value">$8,250</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#eef0ff', color: 'var(--secondary)' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="stat-title">Next Trip Estimate</div>
                <div className="stat-value">$2,100</div>
              </div>
            </motion.div>

            {/* Upcoming Trips */}
            <motion.div variants={itemVariants}>
              <div className="section-header">
                <h2 className="section-title">Recent Trips</h2>
                <Link href="/trips" className="view-all">View All Trips &rarr;</Link>
              </div>

              <div className="trips-grid">
                <Link href="/trips/1" className="trip-card">
                  <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=600" alt="Paris" className="trip-img" />
                  <div className="trip-info">
                    <div className="trip-meta">
                      <span className="trip-status">Upcoming</span>
                      <span>Oct 12 - Oct 20</span>
                    </div>
                    <h3 className="trip-name">Paris Getaway</h3>
                    <div className="trip-progress-bg">
                      <div className="trip-progress-fill" style={{ width: '80%' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)' }}>
                      <span>Planning Progress</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>80%</span>
                    </div>
                  </div>
                </Link>

                <Link href="/trips/2" className="trip-card">
                  <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600" alt="Tokyo" className="trip-img" />
                  <div className="trip-info">
                    <div className="trip-meta">
                      <span className="trip-status" style={{ background: 'var(--accent-green)', color: '#0ca678' }}>Completed</span>
                      <span>Mar 05 - Mar 18</span>
                    </div>
                    <h3 className="trip-name">Tokyo Sakura Season</h3>
                    <div className="trip-progress-bg">
                      <div className="trip-progress-fill" style={{ width: '100%', background: '#0ca678' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)' }}>
                      <span>Planning Progress</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>100%</span>
                    </div>
                  </div>
                </Link>

                <div className="trip-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'transparent', border: '2px dashed var(--border)', boxShadow: 'none' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', marginBottom: 16 }}>
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
                  </div>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Dreaming of somewhere?</h3>
                  <Link href="/trips/new" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Create new itinerary</Link>
                </div>
              </div>
            </motion.div>

            {/* Recommended Destinations */}
            <motion.div variants={itemVariants}>
              <div className="section-header">
                <h2 className="section-title">Inspiration for your next journey</h2>
              </div>
              <div className="reco-grid">
                <div className="reco-card">
                  <img src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=600" alt="Amalfi" />
                  <div className="reco-overlay">
                    <h3 style={{ fontSize: '20px' }}>Amalfi Coast, Italy</h3>
                    <p style={{ opacity: 0.8, fontSize: '13px' }}>Coastal Drives • Seafood</p>
                  </div>
                </div>
                <div className="reco-card">
                  <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600" alt="Dubai" />
                  <div className="reco-overlay">
                    <h3 style={{ fontSize: '20px' }}>Dubai, UAE</h3>
                    <p style={{ opacity: 0.8, fontSize: '13px' }}>Luxury • Desert Safaris</p>
                  </div>
                </div>
                <div className="reco-card">
                  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600" alt="Yosemite" />
                  <div className="reco-overlay">
                    <h3 style={{ fontSize: '20px' }}>Yosemite, USA</h3>
                    <p style={{ opacity: 0.8, fontSize: '13px' }}>Hiking • Nature</p>
                  </div>
                </div>
                <div className="reco-card">
                  <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=600" alt="Kyoto" />
                  <div className="reco-overlay">
                    <h3 style={{ fontSize: '20px' }}>Kyoto, Japan</h3>
                    <p style={{ opacity: 0.8, fontSize: '13px' }}>Temples • Culture</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </main>
      </div>
    </>
  );
}
