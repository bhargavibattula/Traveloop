"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          overflow-x: hidden;
        }

        /* Nav */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          padding: 20px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
          background: rgba(255, 252, 249, 0.9);
          backdrop-filter: blur(10px);
          padding: 15px 60px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
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
          position: relative;
          z-index: 1001;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-link {
          color: var(--text-dark);
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: color 0.2s;
        }

        .nav-link:hover { color: var(--primary); }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 12px 28px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
          background: var(--primary-hover);
        }

        .btn-secondary {
          background: white;
          color: var(--text-dark);
          padding: 12px 28px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.2s;
          border: 1px solid #eee;
        }

        /* Mobile Menu */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001;
          padding: 8px;
        }

        .mobile-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-nav.open {
          transform: translateY(0);
        }

        /* Hero Section */
        .hero {
          padding: 160px 60px 100px;
          background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%);
          position: relative;
          display: flex;
          align-items: center;
          min-height: 100vh;
        }

        .hero-content {
          flex: 1;
          max-width: 600px;
          position: relative;
          z-index: 10;
        }

        .hero-badge {
          background: #ffe3e3;
          color: var(--primary);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 72px;
          font-weight: 800;
          color: var(--text-dark);
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }

        .hero-title span { color: var(--primary); }

        .hero-subtitle {
          color: var(--text-muted);
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 480px;
        }

        .hero-visual {
          flex: 1;
          position: relative;
          height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-image-wrapper {
          position: relative;
          z-index: 5;
          width: 450px;
          height: 550px;
          border-radius: 200px 200px 20px 20px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }

        .hero-img { width: 100%; height: 100%; object-fit: cover; }

        .shape-circle {
          position: absolute;
          width: 500px;
          height: 500px;
          background: #ffd166;
          border-radius: 50%;
          z-index: 1;
          top: 50%;
          left: 50%;
          transform: translate(-40%, -50%);
        }

        .floating-card {
          position: absolute;
          background: white;
          padding: 16px 24px;
          border-radius: 100px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          font-weight: 600;
          color: var(--text-dark);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: float 6s ease-in-out infinite;
        }

        .floating-card.c1 { top: 20%; left: -10%; animation-delay: 0s; }
        .floating-card.c2 { bottom: 30%; right: -5%; animation-delay: 2s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        /* Booking Widget */
        .booking-widget {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border-radius: var(--radius-lg);
          padding: 16px;
          display: flex;
          align-items: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          z-index: 20;
          width: 90%;
          max-width: 1000px;
        }

        .widget-item {
          flex: 1;
          padding: 16px 24px;
          border-right: 1px solid #f1f3f5;
        }
        
        .widget-item:last-child { border: none; }

        .widget-label {
          display: block;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--text-dark);
          font-size: 13px;
        }

        .widget-input {
          border: none;
          outline: none;
          color: var(--text-muted);
          font-size: 14px;
          width: 100%;
          background: transparent;
        }

        .widget-btn {
          background: var(--secondary);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          padding: 16px 32px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          height: 100%;
        }

        /* Section Global */
        .section {
          padding: 100px 60px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 64px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-title {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 16px;
          font-family: 'Cormorant Garamond', serif;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 16px;
          line-height: 1.6;
        }

        /* Features */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .feature-card {
          background: white;
          padding: 40px;
          border-radius: var(--radius-lg);
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: all 0.3s;
          border: 1px solid #f1f3f5;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        /* How it Works */
        .step-row {
          display: flex;
          align-items: center;
          gap: 60px;
          margin-bottom: 80px;
        }

        .step-row:nth-child(even) { flex-direction: row-reverse; }
        .step-content { flex: 1; }
        .step-visual { flex: 1; position: relative; }

        .step-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px;
          color: var(--secondary);
          opacity: 0.2;
          line-height: 1;
          margin-bottom: -20px;
        }

        .step-img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        /* Destinations */
        .dest-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .dest-card {
          position: relative;
          height: 350px;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
        }

        .dest-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .dest-card:hover img { transform: scale(1.1); }

        .dest-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          color: white;
        }

        /* CTA */
        .cta-section {
          background: var(--text-dark);
          color: white;
          text-align: center;
          padding: 80px 20px;
          border-radius: var(--radius-lg);
          margin: 0 60px 100px;
          position: relative;
          overflow: hidden;
        }

        /* Footer */
        .footer {
          background: #f8f9fa;
          padding: 80px 60px 40px;
          border-top: 1px solid #eee;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto 60px;
        }

        @media (max-width: 1024px) {
          .navbar { padding: 15px 30px; }
          .hero { flex-direction: column; padding: 140px 30px 100px; text-align: center; }
          .hero-content { max-width: 100%; margin-bottom: 60px; }
          .hero-title { font-size: 60px; }
          .hero-subtitle { margin: 0 auto 40px; }
          .hero-visual { width: 100%; height: 450px; }
          .hero-image-wrapper { width: 350px; height: 420px; }
          .shape-circle { width: 400px; height: 400px; }
          .booking-widget { position: relative; bottom: 0; transform: none; left: 0; width: 100%; margin-top: 40px; flex-wrap: wrap; }
          .widget-item { border: none; border-bottom: 1px solid #f1f3f5; width: 100%; }
          .widget-btn { width: 100%; padding: 20px; }
          .features-grid { grid-template-columns: 1fr; }
          .step-row, .step-row:nth-child(even) { flex-direction: column; gap: 40px; }
          .dest-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-menu-btn { display: block; }
          .hero-title { font-size: 42px; }
          .section { padding: 80px 24px; }
          .section-title { font-size: 36px; }
          .dest-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; gap: 40px; }
          .footer { padding: 60px 24px 30px; }
          .cta-section { margin: 0 20px 80px; padding: 60px 20px; }
          .cta-section h2 { font-size: 36px !important; }
        }
      `}} />

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary)">
            <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
          </svg>
          Traveloop
        </Link>
        <div className="nav-links">
          <Link href="#features" className="nav-link">Features</Link>
          <Link href="#how-it-works" className="nav-link">How it Works</Link>
          <Link href="#destinations" className="nav-link">Destinations</Link>
          <Link href="/login" className="nav-link" style={{ fontWeight: 600 }}>Sign in</Link>
          <Link href="/register" className="btn-primary">Get Started</Link>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <Link href="#features" className="nav-link" style={{ fontSize: '24px' }} onClick={() => setMobileMenuOpen(false)}>Features</Link>
        <Link href="#how-it-works" className="nav-link" style={{ fontSize: '24px' }} onClick={() => setMobileMenuOpen(false)}>How it Works</Link>
        <Link href="#destinations" className="nav-link" style={{ fontSize: '24px' }} onClick={() => setMobileMenuOpen(false)}>Destinations</Link>
        <Link href="/login" className="nav-link" style={{ fontSize: '24px', fontWeight: 600 }} onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
        <Link href="/register" className="btn-primary" style={{ padding: '16px 40px', fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span style={{ fontSize: '18px' }}>✈️</span> Let's go around the world
          </div>
          <h1 className="hero-title">
            Discover the <br />
            Best <span>Places</span> <br />
            Welcome!
          </h1>
          <p className="hero-subtitle">
            Traveloop is the intelligent SaaS platform for modern explorers. Design multi-city itineraries, track your budget, and manage bookings all in one beautiful workspace.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/register" className="btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>
              Start Planning Free
            </Link>
            <Link href="#how-it-works" className="btn-secondary" style={{ padding: '16px 32px', fontSize: '18px' }}>
              See How It Works
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="shape-circle"></div>
          <div className="hero-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800" 
              alt="Travel Planning" 
              className="hero-img"
            />
          </div>
          <div className="floating-card c1">
            <span style={{ background: '#eef0ff', padding: '8px', borderRadius: '50%' }}>🛡️</span>
            Safe and Secure
          </div>
          <div className="floating-card c2">
            <span style={{ background: '#fff0f0', padding: '8px', borderRadius: '50%' }}>💎</span>
            Best Price Guarantee
          </div>
        </div>

        <div className="booking-widget">
          <div className="widget-item">
            <span className="widget-label">Destination</span>
            <input type="text" className="widget-input" placeholder="Where to?" />
          </div>
          <div className="widget-item">
            <span className="widget-label">Check in</span>
            <input type="text" className="widget-input" placeholder="Add date" />
          </div>
          <div className="widget-item">
            <span className="widget-label">Check out</span>
            <input type="text" className="widget-input" placeholder="Add date" />
          </div>
          <div className="widget-item">
            <span className="widget-label">Travelers</span>
            <input type="text" className="widget-input" placeholder="Add guests" />
          </div>
          <button className="widget-btn">Search</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="section-header">
          <h2 className="section-title">Everything you need to plan the perfect trip</h2>
          <p className="section-subtitle">Replace your messy spreadsheets and scattered docs with a unified, intelligent travel workspace.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div style={{ background: 'var(--accent-green)', color: '#0ca678', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Smart Itinerary Builder</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Drag and drop cities, flights, and activities into a visual timeline. Traveloop automatically calculates travel times between stops.</p>
          </div>

          <div className="feature-card">
            <div style={{ background: '#fff0f0', color: '#ff6b6b', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Real-time Budget Health</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Set your budget limits and track expenses by category. Get intelligent alerts if your planned activities exceed your targets.</p>
          </div>

          <div className="feature-card">
            <div style={{ background: '#eef0ff', color: '#a9a6ff', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Collaborative Planning</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Invite friends and family to your workspace. Vote on activities, split costs seamlessly, and share the final itinerary link.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section" style={{ background: 'white' }}>
        <div className="section-header">
          <h2 className="section-title">How Traveloop Works</h2>
          <p className="section-subtitle">Three simple steps to transform your travel dreams into a concrete plan.</p>
        </div>

        <div className="step-row">
          <div className="step-content">
            <div className="step-num">01</div>
            <h3 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Define Your Journey</h3>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Start by entering your origin, desired destinations, and dates. Traveloop will instantly generate a structural skeleton for your trip.</p>
          </div>
          <div className="step-visual">
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000" alt="Map Planning" className="step-img" />
          </div>
        </div>

        <div className="step-row">
          <div className="step-content">
            <div className="step-num">02</div>
            <h3 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Curate Activities</h3>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Browse our integrated database of highly-rated experiences, restaurants, and hidden gems. Add them to specific days with a single click.</p>
          </div>
          <div className="step-visual">
            <img src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&q=80&w=1000" alt="Activities" className="step-img" />
          </div>
        </div>

        <div className="step-row">
          <div className="step-content">
            <div className="step-num">03</div>
            <h3 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Track & Go</h3>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>As you finalize bookings, log the costs. Traveloop provides a live "Budget Health Score" so you know exactly where you stand before you board the plane.</p>
          </div>
          <div className="step-visual">
            <img src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=1000" alt="Tracking" className="step-img" />
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="section">
        <div className="section-header">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">Discover top-rated itineraries crafted by the Traveloop community.</p>
        </div>

        <div className="dest-grid">
          {[
            { name: 'Paris, France', price: '1,200', days: '5', acts: '12', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=600' },
            { name: 'Tokyo, Japan', price: '2,100', days: '8', acts: '20', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600' },
            { name: 'Amalfi Coast, Italy', price: '1,800', days: '4', acts: '8', img: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=600' },
            { name: 'Dubai, UAE', price: '2,500', days: '6', acts: '15', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600' }
          ].map((dest) => (
            <div key={dest.name} className="dest-card">
              <img src={dest.img} alt={dest.name} />
              <div className="dest-overlay">
                <span style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, alignSelf: 'flex-start', marginBottom: '8px' }}>From ${dest.price}</span>
                <h3 style={{ fontSize: '24px', fontWeight: 700 }}>{dest.name}</h3>
                <p style={{ opacity: 0.8, fontSize: '14px' }}>{dest.days} Days • {dest.acts} Activities</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <h2 style={{ fontSize: '56px', fontFamily: '"Cormorant Garamond", serif', marginBottom: '24px' }}>Ready to start your journey?</h2>
        <p style={{ fontSize: '18px', opacity: 0.8, maxWidth: '600px', margin: '0 auto 40px' }}>
          Join over 10,000 travelers who use Traveloop to design, manage, and budget their dream vacations seamlessly.
        </p>
        <Link href="/register" className="btn-primary" style={{ padding: '16px 40px', fontSize: '18px', background: 'white', color: 'var(--text-dark)' }}>
          Create Your First Trip — It's Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="logo" style={{ marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary)">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
              </svg>
              Traveloop
            </Link>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '300px' }}>
              The all-in-one workspace for the modern traveler. Plan smarter, budget better, travel further.
            </p>
          </div>
          <div className="footer-col">
            <h4 style={{ marginBottom: '20px' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Features</Link>
              <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Pricing</Link>
              <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Destinations</Link>
            </div>
          </div>
          <div className="footer-col">
            <h4 style={{ marginBottom: '20px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About Us</Link>
              <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Careers</Link>
              <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</Link>
            </div>
          </div>
          <div className="footer-col">
            <h4 style={{ marginBottom: '20px' }}>Social</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Twitter</Link>
              <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Instagram</Link>
              <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Facebook</Link>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '40px', borderTop: '1px solid #eee' }}>
          <p>&copy; 2026 Traveloop. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
