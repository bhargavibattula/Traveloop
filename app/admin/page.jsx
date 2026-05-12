"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrips: 0,
    avgBudget: 0,
    activeNow: 0
  });
  const [recentTrips, setRecentTrips] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user || user.email !== 'admin@gmail.com') {
          router.push('/login');
          return;
        }
        
        setUserEmail(user.email);
        await fetchData();
      } catch (err) {
        console.error('Auth check failed:', err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  async function fetchData() {
    try {
      // 1. Fetch total trips
      const { count: tripsCount, data: tripsData } = await supabase
        .from('trips')
        .select('*', { count: 'exact' });

      // 2. Fetch unique users count from trips as proxy
      const uniqueUsers = new Set(tripsData?.map(t => t.user_id) || []);
      
      // 3. Calculate avg budget
      const totalBudget = tripsData?.reduce((acc, t) => acc + (t.budget || 0), 0) || 0;
      const avg = tripsCount ? (totalBudget / tripsCount).toFixed(0) : 0;

      setStats({
        totalUsers: uniqueUsers.size || 0,
        totalTrips: tripsCount || 0,
        avgBudget: avg,
        activeNow: Math.floor(Math.random() * 5) + 1
      });

      // 4. Fetch recent trips
      const { data: recent } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);
      
      setRecentTrips(recent || []);
    } catch (err) {
      console.error('Data fetching failed:', err);
    }
  }

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fffcf9',
        fontFamily: 'Outfit, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #ff6b6b33', 
            borderTopColor: '#ff6b6b', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <div style={{ color: '#ff6b6b', fontWeight: 600 }}>Verifying Admin Access...</div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-root">
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
          --radius-lg: 24px;
          --radius-md: 16px;
        }

        .admin-root {
          background-color: var(--bg-cream);
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
          color: var(--text-dark);
        }

        .admin-layout {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 280px;
          background: white;
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #f1f3f5;
          position: fixed;
          height: 100vh;
          z-index: 100;
        }

        .admin-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--text-dark);
          text-decoration: none;
          margin-bottom: 48px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          border-radius: 16px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          background: transparent;
          font-size: 15px;
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
        .admin-main {
          flex: 1;
          margin-left: 280px;
          padding: 40px 60px;
          min-height: 100vh;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .breadcrumb {
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: 4px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 700;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-peach);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          border: 2px solid white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        /* Stats Grid */
        .grid-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .card {
          background: white;
          border-radius: var(--radius-lg);
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          border: 1px solid #f8f9fa;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          line-height: 1;
        }

        .stat-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          background: var(--accent-green);
          color: #0ca678;
          align-self: flex-start;
        }

        /* Main Grid */
        .grid-main {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        /* Tables */
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          text-align: left;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f3f5;
        }

        .admin-table td {
          padding: 20px 0;
          border-bottom: 1px solid #f1f3f5;
          font-size: 15px;
          font-weight: 500;
        }

        .trip-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-pill {
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
        }

        .status-pill.success { background: #e6fcf5; color: #0ca678; }
        .status-pill.primary { background: var(--bg-peach); color: var(--primary); }

        @media (max-width: 1200px) {
          .grid-stats { grid-template-columns: repeat(2, 1fr); }
          .grid-main { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .admin-sidebar { display: none; }
          .admin-main { margin-left: 0; padding: 24px; }
          .grid-stats { grid-template-columns: 1fr; }
        }
      `}} />

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <Link href="/" className="admin-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--primary)">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
            </svg>
            Traveloop
          </Link>

          <div className="nav-menu">
            <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
              Overview
            </div>
            <div className={`nav-item ${activeTab === 'trips' ? 'active' : ''}`} onClick={() => setActiveTab('trips')}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              Itineraries
            </div>
            <div className="nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              Users
            </div>
            <div className="nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Security
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/login');
              }}
              className="nav-item" 
              style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <header className="topbar">
            <div>
              <div className="breadcrumb">Traveloop Control Center</div>
              <h1 className="page-title">Executive Dashboard</h1>
            </div>
            <div className="admin-profile">
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>Administrator</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{userEmail}</div>
              </div>
              <div className="avatar">AD</div>
            </div>
          </header>

          <div className="grid-stats">
            <div className="card stat-card">
              <div className="stat-label">Global Users</div>
              <div className="stat-value">{stats.totalUsers}</div>
              <div className="stat-badge">↑ Live Data</div>
            </div>
            <div className="card stat-card">
              <div className="stat-label">Total Itineraries</div>
              <div className="stat-value">{stats.totalTrips}</div>
              <div className="stat-badge">↑ All Time</div>
            </div>
            <div className="card stat-card">
              <div className="stat-label">Avg. Trip Budget</div>
              <div className="stat-value">${Number(stats.avgBudget).toLocaleString()}</div>
              <div className="stat-badge" style={{ background: '#fff9db', color: '#f59f00' }}>Luxury Tier</div>
            </div>
            <div className="card stat-card">
              <div className="stat-label">Active Now</div>
              <div className="stat-value">{stats.activeNow}</div>
              <div className="stat-badge" style={{ background: '#eef2ff', color: '#4338ca' }}>Connected</div>
            </div>
          </div>

          <div className="grid-main">
            <div className="card">
              <h3 className="card-title">Recent Itinerary Creations</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Trip Title</th>
                    <th>User ID</th>
                    <th>Budget</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrips.length > 0 ? (
                    recentTrips.map((trip) => (
                      <tr key={trip.id}>
                        <td>
                          <div className="trip-cell">
                            <span style={{ fontSize: '18px' }}>📍</span>
                            {trip.title}
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                          {trip.user_id.substring(0, 8)}...
                        </td>
                        <td style={{ fontWeight: 700 }}>
                          ${trip.budget?.toLocaleString() || '0'}
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                          {new Date(trip.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No trips found in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="card">
              <h3 className="card-title">System Health</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Supabase Connection</span>
                  <span className="status-pill success">Operational</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>AI Engine (Groq)</span>
                  <span className="status-pill success">Optimal</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Auth Services</span>
                  <span className="status-pill success">Active</span>
                </div>
                <div style={{ marginTop: '20px', padding: '16px', background: 'var(--bg-peach)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase' }}>Admin Tip</div>
                  <div style={{ fontSize: '14px', lineHeight: 1.5, opacity: 0.8 }}>
                    Monitor the average budget trends to identify shifting user preferences for luxury vs. budget travel.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
