"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState('explore');
  const [searchMode, setSearchMode] = useState('cities'); // 'cities' or 'activities'
  const [regionFilter, setRegionFilter] = useState('All');
  const [activityType, setActivityType] = useState('All');

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

  const cities = [
    { name: 'Tokyo', country: 'Japan', cost: '$$$', popularity: '4.9', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600', region: 'Asia' },
    { name: 'Paris', country: 'France', cost: '$$$', popularity: '4.8', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=600', region: 'Europe' },
    { name: 'Rome', country: 'Italy', cost: '$$', popularity: '4.7', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=600', region: 'Europe' },
    { name: 'Bali', country: 'Indonesia', cost: '$', popularity: '4.8', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600', region: 'Asia' },
    { name: 'New York', country: 'USA', cost: '$$$$', popularity: '4.6', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600', region: 'Americas' },
  ];

  const activities = [
    { name: 'Sushi Making Class', location: 'Tokyo, Japan', cost: '$$', duration: '3h', type: 'Food', popularity: '4.9', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600' },
    { name: 'Louvre Museum Tour', location: 'Paris, France', cost: '$$', duration: '4h', type: 'Culture', popularity: '4.8', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=600' },
    { name: 'Mount Fuji Day Trip', location: 'Tokyo, Japan', cost: '$$$', duration: '10h', type: 'Adventure', popularity: '4.9', img: 'https://images.unsplash.com/photo-1490806678503-77649540cbba?auto=format&fit=crop&q=80&w=600' },
    { name: 'Colosseum Underpass', location: 'Rome, Italy', cost: '$$', duration: '2h', type: 'Culture', popularity: '4.7', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=600' },
    { name: 'Balinese Cooking', location: 'Ubud, Bali', cost: '$', duration: '5h', type: 'Food', popularity: '4.8', img: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=80&w=600' },
    { name: 'Desert Safari', location: 'Dubai, UAE', cost: '$$$', duration: '6h', type: 'Adventure', popularity: '4.7', img: 'https://images.unsplash.com/photo-1451337516015-5bfae97ad523?auto=format&fit=crop&q=80&w=600' },
  ];

  const regions = ['All', 'Europe', 'Asia', 'Americas', 'Middle East'];
  const activityTypes = ['All', 'Adventure', 'Food', 'Culture', 'Relaxation'];

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
          --accent-yellow: #ffd166;
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

        .search-header {
          text-align: center;
          margin-bottom: 48px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 56px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        /* Search Mode Tabs */
        .mode-tabs {
          display: inline-flex;
          background: white;
          padding: 6px;
          border-radius: 100px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          margin-bottom: 32px;
          border: 1px solid var(--border);
        }

        .mode-tab {
          padding: 10px 32px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--text-muted);
        }

        .mode-tab.active {
          background: var(--primary);
          color: white;
        }

        .search-bar {
          background: white;
          padding: 12px 12px 12px 32px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid var(--border);
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 18px;
          color: var(--text-dark);
        }

        .btn-search {
          background: var(--primary);
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 100px;
          font-weight: 700;
          cursor: pointer;
        }

        /* Filter Section */
        .filter-section {
          margin-bottom: 48px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .filter-chip {
          padding: 10px 24px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-chip:hover { border-color: var(--primary); color: var(--primary); }
        .filter-chip.active { background: var(--primary); color: white; border-color: var(--primary); }

        /* Grid */
        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .card {
          background: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: transform 0.3s;
          display: flex;
          flex-direction: column;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .card-img-wrapper {
          height: 220px;
          position: relative;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.95);
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .card-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .card-subtitle {
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .card-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .meta-label { color: var(--text-dark); }

        .btn-add {
          margin-top: auto;
          width: 100%;
          background: var(--bg-peach);
          color: var(--primary);
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-add:hover { background: var(--primary); color: white; }

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
            <Link href="/trips" className="nav-item">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              My Trips
            </Link>
            <Link href="/search" className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>
              Explore
            </Link>
          </nav>
        </aside>

        <main className="main-content">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            
            <motion.div variants={itemVariants} className="search-header">
              <h1 className="page-title">Discover Experiences</h1>
              
              <div className="mode-tabs">
                <div className={`mode-tab ${searchMode === 'cities' ? 'active' : ''}`} onClick={() => setSearchMode('cities')}>Cities</div>
                <div className={`mode-tab ${searchMode === 'activities' ? 'active' : ''}`} onClick={() => setSearchMode('activities')}>Activities</div>
              </div>

              <div className="search-bar">
                <svg width="24" height="24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input type="text" className="search-input" placeholder={searchMode === 'cities' ? "Where do you want to go?" : "What do you want to do?"} />
                <button className="btn-search">Search</button>
              </div>
            </motion.div>

            {/* Conditional Filters */}
            <motion.div variants={itemVariants} className="filter-section">
              {searchMode === 'cities' ? (
                regions.map(r => (
                  <div key={r} className={`filter-chip ${regionFilter === r ? 'active' : ''}`} onClick={() => setRegionFilter(r)}>{r}</div>
                ))
              ) : (
                activityTypes.map(t => (
                  <div key={t} className={`filter-chip ${activityType === t ? 'active' : ''}`} onClick={() => setActivityType(t)}>{t}</div>
                ))
              )}
            </motion.div>

            {/* Results Grid */}
            <motion.div variants={itemVariants} className="results-grid">
              <AnimatePresence mode='wait'>
                {searchMode === 'cities' ? (
                  cities.filter(c => regionFilter === 'All' || c.region === regionFilter).map((city, i) => (
                    <motion.div 
                      key={`city-${i}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="card"
                    >
                      <div className="card-img-wrapper">
                        <img src={city.img} alt={city.name} className="card-img" />
                        <div className="card-badge">
                          <span style={{ color: 'var(--accent-yellow)' }}>★</span> {city.popularity}
                        </div>
                      </div>
                      <div className="card-content">
                        <h3 className="card-title">{city.name}</h3>
                        <p className="card-subtitle">{city.country}</p>
                        <div className="card-meta">
                          <div>Cost: <span className="meta-label">{city.cost}</span></div>
                          <div>{city.region}</div>
                        </div>
                        <button className="btn-add">+ Add to Trip</button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  activities.filter(a => activityType === 'All' || a.type === activityType).map((act, i) => (
                    <motion.div 
                      key={`act-${i}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="card"
                    >
                      <div className="card-img-wrapper">
                        <img src={act.img} alt={act.name} className="card-img" />
                        <div className="card-badge">
                          <span style={{ color: 'var(--accent-yellow)' }}>★</span> {act.popularity}
                        </div>
                      </div>
                      <div className="card-content">
                        <h3 className="card-title">{act.name}</h3>
                        <p className="card-subtitle">{act.location}</p>
                        <div className="card-meta">
                          <div>Cost: <span className="meta-label">{act.cost}</span></div>
                          <div>Duration: <span className="meta-label">{act.duration}</span></div>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', marginBottom: '16px' }}>{act.type}</div>
                        <button className="btn-add">+ Add to Trip</button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>

          </motion.div>
        </main>
      </div>
    </>
  );
}
