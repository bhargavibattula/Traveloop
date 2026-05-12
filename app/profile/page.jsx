"use client";

import React from 'react';
import { User, Mail, Globe, DollarSign, Camera, Trash2, Save } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="profile-container">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --bg-cream: #fffcf9;
          --bg-peach: #fff0e6;
          --text-dark: #2b2d42;
          --text-muted: #8d99ae;
          --primary: #ff6b6b;
          --border: #f1f3f5;
          --radius-md: 16px;
        }

        .profile-container {
          min-height: 100vh;
          padding: 40px 60px;
          background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%);
          font-family: 'Outfit', sans-serif;
          color: var(--text-dark);
        }

        .section-header { margin-bottom: 40px; }
        .eyebrow { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: var(--primary); margin-bottom: 8px; display: block; }
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 700; margin-bottom: 8px; }
        .page-subtitle { color: var(--text-muted); font-size: 16px; }

        .card { background: white; border-radius: var(--radius-md); border: 1px solid var(--border); }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

        .input-group { margin-bottom: 24px; }
        .input-label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: var(--text-muted); }
        .input-wrap { position: relative; }
        .input-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #ccc; }
        .input-field { 
          width: 100%; padding: 12px 12px 12px 40px; border-radius: 10px; 
          border: 1px solid var(--border); font-size: 14px; outline: none; 
        }
        .input-field:focus { border-color: var(--primary); }

        select.input-field { appearance: none; background: white; cursor: pointer; }

        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 100px; font-weight: 600; border: none; cursor: pointer; font-size: 14px; }
        .btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.2); }
        .btn-danger { background: white; color: var(--primary); border: 1px solid #ffe0e0; }

        .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 24px; margin-top: 32px; }
        .stat-card { background: white; border-radius: var(--radius-md); padding: 32px; border: 1px solid var(--border); text-align: center; }
        .stat-label { display: block; color: var(--text-muted); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .stat-value { display: block; font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; }

        @media (max-width: 768px) {
          .profile-container { padding: 80px 24px 40px; }
          .page-title { font-size: 36px; }
          .form-grid { grid-template-columns: 1fr; }
        }
      `}} />

      <div className="section-header">
        <span className="eyebrow">Account Settings</span>
        <h1 className="page-title">Personal Profile</h1>
        <p className="page-subtitle">Manage your personal information and preferences.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '32px' }}>
        <div style={{ 
          height: '160px', 
          backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <button className="btn" style={{ 
            position: 'absolute', bottom: '16px', right: '16px', 
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
            color: 'white', border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <Camera size={16} /> Edit Cover
          </button>
        </div>
        <div style={{ padding: '0 32px 32px', marginTop: '-48px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', marginBottom: '32px' }}>
            <div style={{ 
              width: '120px', height: '120px', borderRadius: '24px', 
              background: 'white', padding: '4px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '100%', height: '100%', borderRadius: '20px', 
                backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200")',
                backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px', fontWeight: '700', color: '#2d4a8a'
              }}>
                JD
              </div>
            </div>
            <div style={{ paddingBottom: '8px' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '4px' }}>John Doe</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Explorer & Tech Enthusiast</p>
            </div>
          </div>

          <div className="form-grid">
            <div>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <div className="input-wrap">
                  <User size={16} />
                  <input type="text" defaultValue="John Doe" className="input-field" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <div className="input-wrap">
                  <Mail size={16} />
                  <input type="email" defaultValue="john.doe@example.com" className="input-field" />
                </div>
              </div>
            </div>
            <div>
              <div className="input-group">
                <label className="input-label">Language</label>
                <div className="input-wrap">
                  <Globe size={16} />
                  <select className="input-field">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Preferred Currency</label>
                <div className="input-wrap">
                  <DollarSign size={16} />
                  <select className="input-field">
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
            <button className="btn btn-danger"><Trash2 size={16} /> Delete Account</button>
            <button className="btn btn-primary"><Save size={16} /> Save Changes</button>
          </div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Total Trips</span>
          <span className="stat-value">12</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Cities Visited</span>
          <span className="stat-value">28</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Countries</span>
          <span className="stat-value">6</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Photos Shared</span>
          <span className="stat-value">142</span>
        </div>
      </div>
    </div>
  );
}
