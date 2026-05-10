"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, Mail, Globe, DollarSign, Camera, 
  Trash2, Save, LayoutDashboard, Luggage, 
  Search, Sparkles, Wand2, CheckCircle2, 
  Settings, LogOut 
} from 'lucide-react';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('settings');

  return (
    <>
      <div className="dash-layout">
        <aside className="sidebar">
          <Link href="/" className="sidebar-logo">Traveloop</Link>
          <nav className="nav-list">
            <Link href="/dashboard" className="nav-item">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link href="/trips" className="nav-item">
              <Luggage size={18} /> My Trips
            </Link>
            <Link href="/search" className="nav-item">
              <Search size={18} /> Explore
            </Link>
            <Link href="/dashboard/ai-features" className="nav-item">
              <Sparkles size={18} /> AI Features
            </Link>
            <Link href="/dashboard/ai-planner" className="nav-item">
              <Wand2 size={18} /> AI Planner
            </Link>
            <Link href="/dashboard/checklist" className="nav-item">
              <CheckCircle2 size={18} /> Checklist
            </Link>
            <Link href="/dashboard/budget" className="nav-item">
              <DollarSign size={18} /> Budgets
            </Link>
          </nav>
          <div className="sidebar-bottom" style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <Link href="/profile" className="nav-item active">
              <Settings size={18} /> Settings
            </Link>
            <Link href="/login" className="nav-item" style={{ color: 'var(--coral)' }}>
              <LogOut size={18} /> Log Out
            </Link>
          </div>
        </aside>

        <main className="main-content">
          <div className="section-header animate-up">
            <span className="eyebrow">Account Settings</span>
            <h1 className="page-title">Personal Profile</h1>
            <p className="page-subtitle">Manage your personal information and preferences.</p>
          </div>

          <div className="animate-up" style={{ animationDelay: '100ms' }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '32px' }}>
              <div style={{ 
                height: '160px', 
                background: 'linear-gradient(135deg, var(--ocean) 0%, var(--secondary) 100%)',
                backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <button className="btn" style={{ 
                  position: 'absolute', 
                  bottom: '16px', 
                  right: '16px', 
                  background: 'rgba(255,255,255,0.2)', 
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  <Camera size={16} /> Edit Cover
                </button>
              </div>
              <div style={{ padding: '0 32px 32px', marginTop: '-48px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', marginBottom: '32px' }}>
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '24px', 
                    background: 'white', 
                    padding: '4px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      borderRadius: '20px', 
                      background: 'var(--ocean-light)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '32px',
                      fontWeight: '700',
                      color: 'var(--ocean)',
                      backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200")',
                      backgroundSize: 'cover'
                    }}>
                      JD
                    </div>
                  </div>
                  <div style={{ paddingBottom: '8px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '4px' }}>John Doe</h2>
                    <p style={{ color: 'var(--slate)', fontSize: '14px' }}>Explorer & Tech Enthusiast</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                  <div>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--slate)' }}>Full Name</label>
                      <div style={{ position: 'relative' }}>
                        <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)' }} />
                        <input 
                          type="text" 
                          defaultValue="John Doe" 
                          style={{ 
                            width: '100%', 
                            padding: '12px 12px 12px 40px', 
                            borderRadius: '10px', 
                            border: '1px solid var(--border)',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }} 
                          onFocus={(e) => e.target.style.borderColor = 'var(--ocean)'}
                          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--slate)' }}>Email Address</label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)' }} />
                        <input 
                          type="email" 
                          defaultValue="john.doe@example.com" 
                          style={{ 
                            width: '100%', 
                            padding: '12px 12px 12px 40px', 
                            borderRadius: '10px', 
                            border: '1px solid var(--border)',
                            fontSize: '14px',
                            outline: 'none'
                          }} 
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--slate)' }}>Language</label>
                      <div style={{ position: 'relative' }}>
                        <Globe size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)' }} />
                        <select 
                          style={{ 
                            width: '100%', 
                            padding: '12px 12px 12px 40px', 
                            borderRadius: '10px', 
                            border: '1px solid var(--border)',
                            fontSize: '14px',
                            appearance: 'none',
                            background: 'white'
                          }}
                        >
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--slate)' }}>Preferred Currency</label>
                      <div style={{ position: 'relative' }}>
                        <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)' }} />
                        <select 
                          style={{ 
                            width: '100%', 
                            padding: '12px 12px 12px 40px', 
                            borderRadius: '10px', 
                            border: '1px solid var(--border)',
                            fontSize: '14px',
                            appearance: 'none',
                            background: 'white'
                          }}
                        >
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                          <option>JPY (¥)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
                  <button className="btn btn-secondary" style={{ color: 'var(--coral)', borderColor: 'rgba(232, 84, 60, 0.2)' }}>
                    <Trash2 size={16} /> Delete Account
                  </button>
                  <button className="btn btn-primary">
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>
            </div>

            <div className="stat-grid">
              <div className="card stat-card">
                <span className="stat-label">Total Trips</span>
                <span className="stat-value">12</span>
              </div>
              <div className="card stat-card">
                <span className="stat-label">Cities Visited</span>
                <span className="stat-value">28</span>
              </div>
              <div className="card stat-card">
                <span className="stat-label">Countries</span>
                <span className="stat-value">6</span>
              </div>
              <div className="card stat-card">
                <span className="stat-label">Photos Shared</span>
                <span className="stat-value">142</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dash-layout {
          display: flex;
          min-height: 100vh;
        }
        .sidebar {
          width: 240px;
          background: #ffffff;
          border-right: 1px solid var(--border);
          position: fixed;
          height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 32px 0;
          z-index: 100;
        }
        .main-content {
          flex: 1;
          margin-left: 240px;
          padding: 48px 64px;
          max-width: 1440px;
          width: calc(100% - 240px);
        }
        .sidebar-bottom {
          margin-top: auto;
          padding: 0 0px;
        }
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            position: fixed;
            bottom: 0;
            top: auto;
            flex-direction: row;
            padding: 0;
            border-right: none;
            border-top: 1px solid var(--border);
          }
          .main-content {
            margin-left: 0;
            width: 100%;
            padding: 24px 16px 100px;
          }
        }
      `}} />
    </>
  );
}
