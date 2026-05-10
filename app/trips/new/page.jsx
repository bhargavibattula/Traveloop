"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createTrip } from '@/services/trip.service';

export default function CreateTrip() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const trip = await createTrip({
        user_id: '11111111-1111-1111-1111-111111111111',
        title: String(formData.get('title') || ''),
        description: String(formData.get('description') || ''),
        start_date: String(formData.get('start_date') || ''),
        end_date: String(formData.get('end_date') || ''),
        budget: 0,
        travel_style: 'Adventure',
      });

      router.push(`/trips/${trip.id}/edit`);
    } catch (error) {
      console.error('Failed to create trip:', error);
    }
  }

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
          --border: #e9ecef;
          --input-bg: #ffffff;
          --radius-lg: 24px;
          --radius-md: 12px;
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
          min-height: 100vh;
        }

        .split-layout {
          display: flex;
          min-height: 100vh;
        }

        /* Left Form Section */
        .form-section {
          flex: 1;
          padding: 60px 80px;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%);
          position: relative;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 40px;
          transition: color 0.2s;
        }

        .back-link:hover { color: var(--primary); }

        .form-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.1;
        }

        .form-header p {
          color: var(--text-muted);
          font-size: 16px;
          margin-bottom: 48px;
        }

        .form-container {
          max-width: 540px;
          width: 100%;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-label {
          display: block;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-dark);
          font-size: 15px;
        }

        .input-field {
          width: 100%;
          background: var(--input-bg);
          border: 1px solid var(--border);
          padding: 14px 16px;
          border-radius: var(--radius-md);
          font-family: inherit;
          font-size: 15px;
          color: var(--text-dark);
          outline: none;
          transition: all 0.2s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .input-field:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.1);
        }

        .input-field::placeholder { color: #adb5bd; }

        .row {
          display: flex;
          gap: 24px;
        }

        .row .input-group { flex: 1; }

        /* Dropzone */
        .dropzone {
          border: 2px dashed #ced4da;
          border-radius: var(--radius-md);
          padding: 40px 24px;
          text-align: center;
          background: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.2s;
        }

        .dropzone.active {
          border-color: var(--primary);
          background: rgba(255, 107, 107, 0.05);
        }

        .dropzone-icon {
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: var(--primary);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        /* Actions */
        .form-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 48px;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 14px 32px;
          border-radius: 100px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
          transition: all 0.2s;
          flex: 1;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          background: var(--primary-hover);
        }

        .btn-secondary {
          background: white;
          color: var(--text-dark);
          padding: 14px 32px;
          border-radius: 100px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s;
        }

        .btn-secondary:hover { background: #f8f9fa; }

        /* Right Visual Section */
        .visual-section {
          flex: 1.2;
          position: relative;
          display: none;
        }

        @media (min-width: 1024px) {
          .visual-section { display: block; }
        }

        .visual-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 60px;
          color: white;
        }

        .floating-badge {
          position: absolute;
          top: 60px;
          right: 60px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          color: var(--text-dark);
          padding: 12px 20px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
      `}} />

      <div className="split-layout">
        {/* Left Side: Form */}
        <div className="form-section">
          <Link href="/dashboard" className="back-link">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Dashboard
          </Link>

          <motion.div 
            className="form-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="form-header">
              <h1>Design your next journey</h1>
              <p>Fill in the details below to initialize your new itinerary workspace.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Trip Name</label>
                <input name="title" type="text" className="input-field" placeholder="e.g., Summer in Japan 2026" />
              </div>

              <div className="row">
                <div className="input-group">
                  <label className="input-label">Start Date</label>
                  <input name="start_date" type="date" className="input-field" style={{ color: 'var(--text-muted)' }} />
                </div>
                <div className="input-group">
                  <label className="input-label">End Date</label>
                  <input name="end_date" type="date" className="input-field" style={{ color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Description (Optional)</label>
                <textarea 
                  name="description"
                  className="input-field" 
                  rows="4" 
                  placeholder="What is the main goal or vibe of this trip? (e.g., Relaxing beach vacation with family)"
                  style={{ resize: 'none' }}
                ></textarea>
              </div>

              <div className="input-group">
                <label className="input-label">Cover Photo (Optional)</label>
                <div 
                  className={`dropzone ${dragActive ? 'active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrag}
                >
                  <div className="dropzone-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  </div>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: 4 }}>Click to upload or drag and drop</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
              </div>

              <div className="form-actions">
                <Link href="/dashboard" className="btn-secondary">Cancel</Link>
                <button type="submit" className="btn-primary">
                  Create Trip Workspace
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 8 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Right Side: Visual Inspiration */}
        <div className="visual-section">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1400" alt="Travel Inspiration" className="visual-img" />
          
          <div className="floating-badge">
            <span style={{ color: 'var(--primary)' }}>✈️</span> Inspiration from Swiss Alps
          </div>

          <div className="visual-overlay">
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '48px', marginBottom: '16px', lineHeight: 1.1 }}>
              "To travel is to discover that everyone is wrong about other countries."
            </h2>
            <p style={{ opacity: 0.8, fontSize: '18px' }}>— Aldous Huxley</p>
          </div>
        </div>
      </div>
    </>
  );
}
