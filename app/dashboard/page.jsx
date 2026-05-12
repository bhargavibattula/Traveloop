"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTrips } from '@/hooks/useTrips';
import { supabase } from '@/lib/supabase';
import { Plus } from 'lucide-react';

const DEMO_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID || '11111111-1111-1111-1111-111111111111';

export default function UserDashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState(DEMO_USER_ID);
  const { trips, loading, error, refetch } = useTrips(userId);
  const upcomingTrips = trips.slice(0, 3);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) setUserId(user.id);
    }
    void loadUser();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <div className="dash-container">
      <style dangerouslySetInnerHTML={{__html: `
        :root { 
          --bg-cream:#fffcf9; --bg-peach:#fff0e6; --text-dark:#2b2d42; 
          --text-muted:#8d99ae; --primary:#ff6b6b; --border:#f1f3f5; --radius-md:16px; 
        }
        
        .dash-container {
          min-height: 100vh;
          padding: 40px 60px;
          background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%);
        }

        .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 48px; }
        .welcome-text h1 { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 700; margin-bottom: 4px; }
        
        .btn-create {
          background: var(--primary); color: white; padding: 14px 28px; 
          border-radius: 100px; font-weight: 700; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 10px 20px rgba(255, 107, 107, 0.2); transition: all 0.2s;
        }
        .btn-create:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(255, 107, 107, 0.3); }

        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 48px; }
        .stat-card { background: white; padding: 32px; border-radius: var(--radius-md); border: 1px solid #f1f3f5; }
        .stat-label { color: var(--text-muted); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; }

        .section-title { font-size: 24px; font-weight: 700; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
        .view-all { color: var(--primary); text-decoration: none; font-size: 14px; font-weight: 700; }

        .trips-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 60px; }
        .trip-card { background: white; border-radius: var(--radius-md); overflow: hidden; border: 1px solid #f1f3f5; text-decoration: none; color: inherit; transition: transform 0.3s; }
        .trip-card:hover { transform: translateY(-8px); }
        .trip-img { width: 100%; height: 200px; object-fit: cover; }
        
        .reco-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .reco-card { position: relative; height: 280px; border-radius: var(--radius-md); overflow: hidden; cursor: pointer; }
        .reco-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .reco-card:hover img { transform: scale(1.1); }
        .reco-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; color: white; }

        @media (max-width: 768px) {
          .dash-container { padding: 80px 24px 40px; }
          .welcome-text h1 { font-size: 36px; }
          .topbar { flex-direction: column; align-items: flex-start; gap: 24px; }
          .reco-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}} />

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants} className="topbar">
          <div className="welcome-text">
            <h1>Welcome back!</h1>
            <p style={{ color: 'var(--text-muted)' }}>{loading ? 'Curating your adventures...' : `You have ${trips.length} active itineraries.`}</p>
          </div>
          <Link href="/trips/new" className="btn-create">
            <Plus size={20} /> Plan New Trip
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Journeys</div>
            <div className="stat-value">{trips.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Destinations</div>
            <div className="stat-value">{new Set(trips.map(t => t.title)).size}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Status</div>
            <div className="stat-value" style={{ color: '#0ca678' }}>Active</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="section-title">
            Upcoming Adventures
            <Link href="/trips" className="view-all">View All &rarr;</Link>
          </div>

          {loading ? (
            <div style={{ padding: 60, textAlign: 'center', background: 'white', borderRadius: 24 }}>Loading...</div>
          ) : upcomingTrips.length > 0 ? (
            <div className="trips-grid">
              {upcomingTrips.map((trip) => (
                <Link key={trip.id} href={`/trips/${trip.id}`} className="trip-card">
                  <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800" alt={trip.title} className="trip-img" />
                  <div style={{ padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>
                      <span style={{ background: 'var(--bg-peach)', padding: '4px 12px', borderRadius: 100 }}>Upcoming</span>
                      <span style={{ color: 'var(--text-muted)' }}>{trip.start_date || 'Flexible'}</span>
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 700 }}>{trip.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ padding: 60, textAlign: 'center', background: 'white', borderRadius: 24, border: '1px dashed #ddd' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>Your travel log is empty.</p>
              <Link href="/trips/new" style={{ color: 'var(--primary)', fontWeight: 700 }}>Start Planning &rarr;</Link>
            </div>
          )}
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginTop: 60 }}>
          <div className="section-title">
            Inspiration for your next journey
          </div>
          <div className="reco-grid">
            {[
              { name: 'Amalfi Coast, Italy', img: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=600' },
              { name: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600' },
              { name: 'Swiss Alps', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=600' },
              { name: 'Kyoto, Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600' }
            ].map((dest) => (
              <div key={dest.name} className="reco-card">
                <img src={dest.img} alt={dest.name} />
                <div className="reco-overlay">
                  <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
