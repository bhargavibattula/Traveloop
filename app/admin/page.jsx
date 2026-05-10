"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --admin-bg: #f4f7fe;
          --admin-card: #ffffff;
          --admin-text: #2b3674;
          --admin-muted: #a3aed1;
          --admin-primary: #4318ff;
          --admin-success: #05cd99;
          --admin-warning: #ffce20;
          --admin-danger: #ee5d50;
          --admin-border: #e9edf7;
          --radius: 20px;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: var(--admin-bg);
          font-family: 'Outfit', sans-serif;
          color: var(--admin-text);
        }

        .admin-layout {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 280px;
          background: var(--admin-card);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--admin-border);
        }

        .admin-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--admin-text);
          text-decoration: none;
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          border-radius: 12px;
          color: var(--admin-muted);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
          cursor: pointer;
        }

        .nav-item:hover {
          background: rgba(67, 24, 255, 0.05);
          color: var(--admin-primary);
        }

        .nav-item.active {
          background: var(--admin-primary);
          color: white;
          box-shadow: 0 10px 20px rgba(67, 24, 255, 0.2);
        }

        /* Main Content */
        .admin-main {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          height: 100vh;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(10px);
          padding: 16px 24px;
          border-radius: var(--radius);
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }

        .breadcrumb {
          color: var(--admin-muted);
          font-size: 14px;
          margin-bottom: 4px;
        }

        .page-title {
          font-size: 32px;
          font-weight: 700;
        }

        .search-container {
          background: var(--admin-bg);
          border-radius: 100px;
          padding: 10px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 300px;
        }

        .search-container input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          color: var(--admin-text);
          font-family: inherit;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--admin-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        /* Grid System */
        .grid-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 24px;
        }

        .card {
          background: var(--admin-card);
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info h4 {
          color: var(--admin-muted);
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .stat-info p {
          font-size: 24px;
          font-weight: 700;
          color: var(--admin-text);
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 700;
          margin-top: 4px;
        }

        .grid-main {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
        }

        /* Chart Simulation */
        .chart-container {
          height: 250px;
          display: flex;
          align-items: flex-end;
          gap: 16px;
          padding-top: 20px;
        }

        .chart-bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .chart-bar {
          width: 100%;
          max-width: 40px;
          background: var(--admin-primary);
          border-radius: 8px 8px 0 0;
          transition: height 1s ease-out;
          position: relative;
        }

        .chart-bar:hover {
          opacity: 0.8;
        }

        .chart-label {
          color: var(--admin-muted);
          font-size: 12px;
          font-weight: 600;
        }

        /* Tables */
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          text-align: left;
          color: var(--admin-muted);
          font-size: 14px;
          font-weight: 600;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--admin-border);
        }

        .admin-table td {
          padding: 16px 0;
          border-bottom: 1px solid var(--admin-border);
          font-size: 15px;
          font-weight: 600;
        }

        .admin-table tr:last-child td {
          border-bottom: none;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e9edf7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }

        .badge {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
        }

        .badge.active { background: rgba(5, 205, 153, 0.1); color: var(--admin-success); }
        .badge.offline { background: rgba(163, 174, 209, 0.1); color: var(--admin-muted); }

        .action-btn {
          background: transparent;
          border: none;
          color: var(--admin-muted);
          cursor: pointer;
          transition: color 0.2s;
        }

        .action-btn:hover { color: var(--admin-primary); }

        /* Top Destinations List */
        .dest-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dest-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .dest-img {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          object-fit: cover;
        }

        .dest-info {
          flex: 1;
        }

        .dest-name { font-weight: 700; margin-bottom: 4px; }
        .dest-stats { color: var(--admin-muted); font-size: 13px; font-weight: 500; }
        
        .progress-bar {
          width: 100%;
          height: 6px;
          background: var(--admin-border);
          border-radius: 10px;
          margin-top: 8px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--admin-primary);
          border-radius: 10px;
        }

      `}} />

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <Link href="/" className="admin-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--admin-primary)">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
            </svg>
            Traveloop
          </Link>

          <div className="nav-menu">
            <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
              Dashboard
            </div>
            <div className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              User Management
            </div>
            <div className={`nav-item ${activeTab === 'trips' ? 'active' : ''}`} onClick={() => setActiveTab('trips')}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              Trip Data
            </div>
            <div className="nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              Settings
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          {/* Topbar */}
          <header className="topbar">
            <div>
              <div className="breadcrumb">Pages / Dashboard</div>
              <h1 className="page-title">Main Dashboard</h1>
            </div>
            <div className="admin-profile">
              <div className="search-container">
                <svg width="18" height="18" fill="none" stroke="var(--admin-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input type="text" placeholder="Search data..." />
              </div>
              <div className="avatar">A</div>
            </div>
          </header>

          {/* Stats Row */}
          <div className="grid-stats">
            <div className="card stat-card">
              <div className="stat-icon" style={{ background: 'rgba(67, 24, 255, 0.1)', color: 'var(--admin-primary)' }}>
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              </div>
              <div className="stat-info">
                <h4>Total Users</h4>
                <p>12,430</p>
                <div className="stat-trend" style={{ color: 'var(--admin-success)' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                  +15%
                </div>
              </div>
            </div>

            <div className="card stat-card">
              <div className="stat-icon" style={{ background: 'rgba(5, 205, 153, 0.1)', color: 'var(--admin-success)' }}>
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              </div>
              <div className="stat-info">
                <h4>Trips Created</h4>
                <p>48,205</p>
                <div className="stat-trend" style={{ color: 'var(--admin-success)' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                  +8%
                </div>
              </div>
            </div>

            <div className="card stat-card">
              <div className="stat-icon" style={{ background: 'rgba(255, 206, 32, 0.1)', color: 'var(--admin-warning)' }}>
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div className="stat-info">
                <h4>Avg. Budget/Trip</h4>
                <p>$3,450</p>
                <div className="stat-trend" style={{ color: 'var(--admin-success)' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                  +2%
                </div>
              </div>
            </div>

            <div className="card stat-card">
              <div className="stat-icon" style={{ background: 'rgba(238, 93, 80, 0.1)', color: 'var(--admin-danger)' }}>
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <div className="stat-info">
                <h4>Conversion Rate</h4>
                <p>12.5%</p>
                <div className="stat-trend" style={{ color: 'var(--admin-danger)' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(180)"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                  -1.5%
                </div>
              </div>
            </div>
          </div>

          {/* Charts & Top Destinations */}
          <div className="grid-main">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Trips Created (Monthly)</h3>
                <select style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--admin-border)', outline: 'none', color: 'var(--admin-muted)', fontWeight: 600 }}>
                  <option>This Year</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="chart-container">
                {[40, 60, 45, 80, 55, 90, 70, 85, 100, 65, 75, 80].map((height, i) => (
                  <div key={i} className="chart-bar-group">
                    <div className="chart-bar" style={{ height: `${height}%` }}></div>
                    <span className="chart-label">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Top Destinations</h3>
              </div>
              <div className="dest-list">
                <div className="dest-item">
                  <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=150" alt="Paris" className="dest-img" />
                  <div className="dest-info">
                    <div className="dest-name">Paris, France</div>
                    <div className="dest-stats">4,200 Trips</div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '85%' }}></div></div>
                  </div>
                </div>
                <div className="dest-item">
                  <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=150" alt="Tokyo" className="dest-img" />
                  <div className="dest-info">
                    <div className="dest-name">Tokyo, Japan</div>
                    <div className="dest-stats">3,850 Trips</div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '75%', background: 'var(--admin-warning)' }}></div></div>
                  </div>
                </div>
                <div className="dest-item">
                  <img src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=150" alt="Amalfi Coast" className="dest-img" />
                  <div className="dest-info">
                    <div className="dest-name">Amalfi Coast, Italy</div>
                    <div className="dest-stats">2,900 Trips</div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '60%', background: 'var(--admin-success)' }}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Management Table */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Users Management</h3>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--admin-primary)', fontWeight: 700, cursor: 'pointer' }}>View All</button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>USER</th>
                  <th>JOIN DATE</th>
                  <th>STATUS</th>
                  <th>TRIPS</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Sarah Jenkins', email: 'sarah@example.com', date: 'May 10, 2026', status: 'Active', trips: 4 },
                  { name: 'Michael Chen', email: 'michael@example.com', date: 'May 09, 2026', status: 'Active', trips: 1 },
                  { name: 'Emma Watson', email: 'emma@example.com', date: 'May 07, 2026', status: 'Offline', trips: 0 },
                  { name: 'David Lee', email: 'david@example.com', date: 'May 05, 2026', status: 'Active', trips: 12 },
                ].map((user, i) => (
                  <tr key={i}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{user.name.charAt(0)}</div>
                        <div>
                          <div>{user.name}</div>
                          <div style={{ fontSize: '13px', color: 'var(--admin-muted)', fontWeight: 500 }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--admin-muted)', fontWeight: 500 }}>{user.date}</td>
                    <td>
                      <span className={`badge ${user.status.toLowerCase()}`}>{user.status}</span>
                    </td>
                    <td>{user.trips}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                        <button className="action-btn" title="Edit User">
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button className="action-btn" title="Delete User" style={{ color: 'var(--admin-danger)' }}>
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
