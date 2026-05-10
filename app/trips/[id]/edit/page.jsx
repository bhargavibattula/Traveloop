"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

  if (loading) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>Failed to load trip. Please refresh.</p>
      </div>
    );
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
    <div className="container animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <Link href={`/trips/${id}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>Back to Itinerary</Link>
          <h1 className="page-title">Edit: {trip.title}</h1>
        </div>
      </div>

      <div className="glass" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
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

          {(formError || updateError) && (
            <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{formError || updateError}</p>
          )}

          <div className="flex-between" style={{ marginTop: '3rem' }}>
            <Link href={`/trips/${id}`} className="btn btn-outline">Cancel</Link>
            <button type="submit" className="btn btn-primary" disabled={updateLoading}>
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
