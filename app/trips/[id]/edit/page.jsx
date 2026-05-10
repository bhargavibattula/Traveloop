"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUpdateTrip } from '@/hooks/useTripMutations';
import { useTripById } from '@/hooks/useTrips';

export default function ItineraryBuilder({ params }) {
  const { id } = params;
  const router = useRouter();
  const { trip, loading, error } = useTripById(id);
  const { updateTrip, loading: updateLoading, error: updateError } = useUpdateTrip();
  const [formError, setFormError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);

    try {
      await updateTrip(id, {
        title: String(formData.get('title') || '').trim(),
        destination: String(formData.get('destination') || '').trim(),
        start_date: String(formData.get('start_date') || ''),
        end_date: String(formData.get('end_date') || ''),
        description: String(formData.get('description') || '').trim(),
      });
      router.push(`/trips/${id}`);
    } catch (mutationError) {
      setFormError(mutationError instanceof Error ? mutationError.message : 'Failed to update trip.');
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  if (loading) {
    return <div className="container animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>Loading...</div>;
  }

  if (error) {
    return <div className="container animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>Failed to load trip. Please refresh.</div>;
  }

  if (!trip) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Trip not found.</p>
        <Link href="/trips" className="btn btn-outline">Back to Trips</Link>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root { --bg-cream:#fffcf9; --bg-peach:#fff0e6; --text-dark:#2b2d42; --text-muted:#8d99ae; --primary:#ff6b6b; --primary-hover:#fa5252; --border:#e9ecef; --input-bg:#f8f9fa; --radius-lg:24px; --radius-md:16px; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; background-color: var(--bg-cream); color: var(--text-dark); }
        .main-content { padding: 40px 60px; background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%); min-height: 100vh; }
        .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .breadcrumb { display: inline-flex; align-items: center; gap: 8px; color: var(--text-muted); text-decoration: none; font-weight: 600; font-size: 14px; margin-bottom: 8px; }
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; line-height: 1.1; }
        .edit-card { background: white; border-radius: var(--radius-lg); padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); max-width: 860px; }
        .input-group { margin-bottom: 20px; }
        .input-label { display: block; color: var(--text-dark); font-weight: 700; margin-bottom: 8px; }
        .input-field { width: 100%; border: 1px solid var(--border); background: var(--input-bg); border-radius: 12px; padding: 12px 14px; font-family: inherit; font-size: 15px; color: var(--text-dark); }
        .btn-primary { background: var(--primary); color: white; padding: 12px 28px; border-radius: 100px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(255,107,107,0.3); transition: transform 0.2s; border: none; cursor: pointer; }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-secondary { background: white; color: var(--text-dark); padding: 12px 28px; border-radius: 100px; font-weight: 600; text-decoration: none; display: inline-flex; border: 1px solid var(--border); }
        .form-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 32px; }
      `}} />

      <main className="main-content">
        <motion.div variants={itemVariants} initial="hidden" animate="show">
          <div className="topbar">
            <div>
              <Link href={`/trips/${id}`} className="breadcrumb">Back to Itinerary</Link>
              <h1 className="page-title">Edit: {trip.title}</h1>
            </div>
          </div>

          <div className="edit-card">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Trip Name</label>
                <input name="title" type="text" className="input-field" defaultValue={trip.title || ''} />
              </div>

              <div className="input-group">
                <label className="input-label">Destination</label>
                <input name="destination" type="text" className="input-field" defaultValue={trip.destination || ''} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="input-group">
                  <label className="input-label">Start Date</label>
                  <input name="start_date" type="date" className="input-field" defaultValue={trip.start_date || ''} />
                </div>
                <div className="input-group">
                  <label className="input-label">End Date</label>
                  <input name="end_date" type="date" className="input-field" defaultValue={trip.end_date || ''} />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea name="description" className="input-field" rows="4" defaultValue={trip.description || ''}></textarea>
              </div>

              {(formError || updateError) && <p style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{formError || updateError}</p>}

              <div className="form-actions">
                <Link href={`/trips/${id}`} className="btn-secondary">Cancel</Link>
                <button type="submit" className="btn-primary" disabled={updateLoading}>{updateLoading ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </>
  );
}
