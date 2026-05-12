"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDeleteTrip } from '@/hooks/useTripMutations';
import { useTrips } from '@/hooks/useTrips';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Edit3, Eye } from 'lucide-react';

const DEMO_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID || '11111111-1111-1111-1111-111111111111';

function formatDateRange(startDate, endDate) {
  if (!startDate && !endDate) return 'Dates not set';
  if (startDate && endDate) return `${startDate} - ${endDate}`;
  return startDate || endDate;
}

export default function MyTrips() {
  const [filter, setFilter] = useState('All Trips');
  const [userId, setUserId] = useState(DEMO_USER_ID);
  const { trips, loading, error, refetch } = useTrips(userId);
  const { deleteTrip, loading: deleteLoading } = useDeleteTrip();

  const visibleTrips = useMemo(
    () => trips.filter((trip) => filter === 'All Trips' || (trip.status || 'Upcoming') === filter),
    [filter, trips],
  );

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) setUserId(user.id);
    }
    void loadUser();
  }, []);

  async function handleDeleteTrip(id) {
    if (confirm('Are you sure you want to delete this trip?')) {
      try {
        await deleteTrip(id);
        refetch();
      } catch (err) {
        console.error('Failed to delete trip:', err);
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <div className="trips-container">
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --bg-cream: #fffcf9;
          --bg-peach: #fff0e6;
          --text-dark: #2b2d42;
          --text-muted: #8d99ae;
          --primary: #ff6b6b;
          --border: #f1f3f5;
          --radius-md: 16px;
        }

        .trips-container {
          min-height: 100vh;
          padding: 40px 60px;
          background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%);
        }

        .topbar { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; gap: 24px; }
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 700; margin-bottom: 8px; }
        
        .btn-primary { 
          background: var(--primary); color: white; padding: 14px 28px; 
          border-radius: 100px; font-weight: 700; text-decoration: none;
          display: flex; align-items: center; gap: 8px; box-shadow: 0 10px 20px rgba(255, 107, 107, 0.2); 
        }

        .trips-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 32px; }
        .trip-card { background: white; border-radius: var(--radius-md); overflow: hidden; border: 1px solid #f1f3f5; transition: transform 0.3s; display: flex; flex-direction: column; }
        .trip-card:hover { transform: translateY(-8px); }
        .trip-img { width: 100%; height: 220px; object-fit: cover; }
        
        .trip-body { padding: 24px; flex: 1; }
        .trip-name { font-size: 24px; font-weight: 700; margin-bottom: 12px; }
        .trip-date { color: var(--primary); font-weight: 700; font-size: 13px; margin-bottom: 8px; }
        .trip-desc { color: var(--text-muted); font-size: 15px; line-height: 1.6; }

        .trip-actions { padding: 16px 24px; border-top: 1px solid #f8f9fa; display: flex; justify-content: space-between; }
        .action-icon { color: var(--text-muted); cursor: pointer; transition: color 0.2s; }
        .action-icon:hover { color: var(--primary); }

        @media (max-width: 768px) {
          .trips-container { padding: 80px 24px 40px; }
          .topbar { flex-direction: column; align-items: flex-start; }
        }
      `}} />

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants} className="topbar">
          <div>
            <h1 className="page-title">My Trips</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage and explore your upcoming and past itineraries.</p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/trips/new" className="btn-primary"><Plus size={20} /> New Trip</Link>
          </div>
        </motion.div>

        {loading ? (
          <div style={{ padding: 60, textAlign: 'center', background: 'white', borderRadius: 24 }}>Loading trips...</div>
        ) : trips.length > 0 ? (
          <div className="trips-grid">
            {visibleTrips.map((trip) => (
              <div key={trip.id} className="trip-card">
                <img 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800" 
                  alt={trip.title} 
                  className="trip-img" 
                />
                <div className="trip-body">
                  <div className="trip-date">{formatDateRange(trip.start_date, trip.end_date)}</div>
                  <h3 className="trip-name">{trip.title}</h3>
                  <p className="trip-desc">{trip.description || 'No description provided yet.'}</p>
                </div>
                <div className="trip-actions">
                  <Link href={`/trips/${trip.id}`} className="action-icon" title="View"><Eye size={20} /></Link>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <Link href={`/trips/${trip.id}/edit`} className="action-icon" title="Edit"><Edit3 size={20} /></Link>
                    <button onClick={() => handleDeleteTrip(trip.id)} className="action-icon" style={{ background: 'none', border: 'none' }} title="Delete">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: 60, textAlign: 'center', background: 'white', borderRadius: 24, border: '1px dashed #ddd' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>No trips found.</p>
            <Link href="/trips/new" style={{ color: 'var(--primary)', fontWeight: 700 }}>Plan your first adventure &rarr;</Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
