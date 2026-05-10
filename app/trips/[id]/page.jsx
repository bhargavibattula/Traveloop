"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useActivityMutations } from '@/hooks/useActivities';
import { useStopMutations } from '@/hooks/useStops';
import { useTripById } from '@/hooks/useTrips';
import { fetchActivitiesByStop } from '@/services/activity.service';
import { fetchStopsByTrip } from '@/services/stop.service';

function formatDateRange(startDate, endDate) {
  if (!startDate && !endDate) {
    return 'Dates not set';
  }

  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }

  return startDate || endDate;
}

function getStopTitle(stop) {
  const cityCountry = [stop.city, stop.country].filter(Boolean).join(', ');
  return stop.title || stop.location || cityCountry || 'Untitled stop';
}

function getStopOrder(stop) {
  return stop.stop_order ?? stop.position ?? 0;
}

function getActivityDescription(activity) {
  return activity.description || activity.notes || activity.duration || 'No details added yet.';
}

export default function ItineraryView({ params }) {
  const { id } = params;
  const { trip, loading, error, refetch } = useTripById(id);
  const { addStop, deleteStop, loading: stopLoading, error: stopError } = useStopMutations();
  const { addActivity, removeActivity, loading: activityLoading, error: activityError } = useActivityMutations();
  const [viewMode, setViewMode] = useState('list');
  const [stops, setStops] = useState([]);
  const [activitiesByStop, setActivitiesByStop] = useState({});
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedError, setRelatedError] = useState(null);
  const [stopFormError, setStopFormError] = useState(null);
  const [activityFormErrors, setActivityFormErrors] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  const refetchPage = useCallback(async () => {
    refetch();
    setRefreshKey((currentKey) => currentKey + 1);
  }, [refetch]);

  useEffect(() => {
    let mounted = true;

    async function fetchRelatedData() {
      if (!trip) {
        setStops([]);
        setActivitiesByStop({});
        return;
      }

      setRelatedLoading(true);
      setRelatedError(null);

      try {
        const fetchedStops = await fetchStopsByTrip(id);
        const activityGroups = {};
        const activityErrors = [];

        await Promise.all(
          fetchedStops.map(async (stop) => {
            try {
              activityGroups[stop.id] = await fetchActivitiesByStop(stop.id);
            } catch (activityFetchError) {
              activityGroups[stop.id] = [];
              activityErrors.push(activityFetchError);
            }
          }),
        );

        if (mounted) {
          setStops(fetchedStops);
          setActivitiesByStop(activityGroups);

          if (activityErrors.length > 0) {
            setRelatedError('Some activities failed to load. Stops are still shown.');
          }
        }
      } catch (fetchError) {
        if (mounted) {
          setRelatedError(fetchError instanceof Error ? fetchError.message : 'Failed to load itinerary details.');
        }
      } finally {
        if (mounted) {
          setRelatedLoading(false);
        }
      }
    }

    void fetchRelatedData();

    return () => {
      mounted = false;
    };
  }, [id, refreshKey, trip?.id]);

  async function handleAddStop(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStopFormError(null);

    const formData = new FormData(form);
    const locationName = String(formData.get('location') || '').trim();

    if (!locationName) {
      setStopFormError('Location name is required.');
      return;
    }

    try {
      await addStop({
        trip_id: id,
        city: locationName,
        country: '',
        position: stops.length,
      });
      form.reset();
      await refetchPage();
    } catch (mutationError) {
      setStopFormError(mutationError instanceof Error ? mutationError.message : 'Failed to add stop.');
    }
  }

  async function handleDeleteStop(stopId) {
    setStopFormError(null);

    try {
      await deleteStop(stopId);
      await refetchPage();
    } catch (mutationError) {
      setStopFormError(mutationError instanceof Error ? mutationError.message : 'Failed to delete stop.');
    }
  }

  async function handleAddActivity(event, stopId) {
    event.preventDefault();
    const form = event.currentTarget;
    setActivityFormErrors((currentErrors) => ({ ...currentErrors, [stopId]: null }));

    const formData = new FormData(form);
    const title = String(formData.get('title') || '').trim();
    const notes = String(formData.get('notes') || '').trim();

    if (!title) {
      setActivityFormErrors((currentErrors) => ({ ...currentErrors, [stopId]: 'Activity name is required.' }));
      return;
    }

    try {
      await addActivity({
        stop_id: stopId,
        title,
        category: 'Activity',
        cost: 0,
        duration: '',
        notes,
        position: activitiesByStop[stopId]?.length || 0,
      });
      form.reset();
      await refetchPage();
    } catch (mutationError) {
      setActivityFormErrors((currentErrors) => ({
        ...currentErrors,
        [stopId]: mutationError instanceof Error ? mutationError.message : 'Failed to add activity.',
      }));
    }
  }

  async function handleRemoveActivity(activityId) {
    try {
      await removeActivity(activityId);
      await refetchPage();
    } catch (mutationError) {
      setRelatedError(mutationError instanceof Error ? mutationError.message : 'Failed to remove activity.');
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  if (loading) {
    return <div className="container animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>Loading trip...</div>;
  }

  if (error) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <p style={{ marginBottom: '1rem' }}>Failed to load trip. Please refresh.</p>
        <button type="button" className="btn btn-outline" onClick={() => refetch()}>Retry</button>
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
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root { --bg-cream:#fffcf9; --bg-peach:#fff0e6; --text-dark:#2b2d42; --text-muted:#8d99ae; --primary:#ff6b6b; --primary-hover:#fa5252; --secondary:#a9a6ff; --border:#f1f3f5; --radius-lg:24px; --radius-md:16px; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; background-color: var(--bg-cream); color: var(--text-dark); }
        .main-content { padding: 40px 60px; background: linear-gradient(135deg, var(--bg-cream) 0%, var(--bg-peach) 100%); min-height: 100vh; }
        .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .breadcrumb { display: inline-flex; align-items: center; gap: 8px; color: var(--text-muted); text-decoration: none; font-weight: 600; font-size: 14px; margin-bottom: 8px; }
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; }
        .page-subtitle { color: var(--text-muted); margin-top: 8px; }
        .view-controls { display: flex; background: white; padding: 4px; border-radius: 100px; border: 1px solid var(--border); }
        .view-btn { padding: 8px 16px; border-radius: 100px; border: none; font-family: inherit; font-weight: 600; font-size: 13px; cursor: pointer; background: transparent; color: var(--text-muted); }
        .view-btn.active { background: var(--bg-peach); color: var(--primary); }
        .itinerary-grid { display: grid; grid-template-columns: 240px 1fr; gap: 40px; }
        .day-nav { position: sticky; top: 40px; height: fit-content; display: flex; flex-direction: column; gap: 12px; }
        .day-nav-item, .itinerary-card, .state-card { padding: 20px; background: white; border-radius: var(--radius-md); box-shadow: 0 4px 12px rgba(0,0,0,0.02); border: 1px solid transparent; }
        .itinerary-card { padding: 32px; margin-bottom: 24px; }
        .activity-row { display: flex; gap: 20px; padding: 18px 0; border-bottom: 1px solid var(--border); }
        .activity-row:last-child { border-bottom: none; }
        .activity-dot { width: 36px; height: 36px; border-radius: 50%; background: var(--bg-peach); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .btn-primary { background: var(--primary); color: white; padding: 12px 24px; border-radius: 100px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(255,107,107,0.3); border: none; cursor: pointer; }
        .btn-primary:disabled, .btn-secondary:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-secondary { background: white; color: var(--text-dark); padding: 10px 18px; border-radius: 100px; font-weight: 600; text-decoration: none; display: inline-flex; border: 1px solid var(--border); cursor: pointer; }
        .input-field { width: 100%; border: 1px solid var(--border); background: #f8f9fa; border-radius: 12px; padding: 10px 12px; font-family: inherit; font-size: 14px; color: var(--text-dark); }
      `}} />

      <main className="main-content">
        <motion.div variants={itemVariants} initial="hidden" animate="show">
          <div className="topbar">
            <div>
              <Link href="/trips" className="breadcrumb">Back to Trips</Link>
              <h1 className="page-title">{trip.title}</h1>
              <p className="page-subtitle">{formatDateRange(trip.start_date, trip.end_date)} · {stops.length} Stops</p>
              {trip.description && <p className="page-subtitle">{trip.description}</p>}
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="view-controls">
                <button type="button" className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>List</button>
                <button type="button" className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`} onClick={() => setViewMode('calendar')}>Calendar</button>
              </div>
              <Link href={`/trips/${id}/edit`} className="btn-secondary">Edit</Link>
              <Link href={`/trips/${id}/budget`} className="btn-primary">Budget</Link>
            </div>
          </div>

          <div className="itinerary-grid">
            <aside className="day-nav">
              {relatedLoading && <div className="day-nav-item">Loading stops...</div>}
              {!relatedLoading && stops.length === 0 && <div className="day-nav-item">No stops yet</div>}
              {!relatedLoading && stops.map((stop) => (
                <div key={stop.id} className="day-nav-item">
                  <span>Stop {getStopOrder(stop) + 1}</span>
                  <strong>{getStopTitle(stop)}</strong>
                </div>
              ))}
            </aside>

            <section>
              {relatedError && <p style={{ color: 'var(--primary)', marginBottom: 16 }}>{relatedError}</p>}
              {stopError && <p style={{ color: 'var(--primary)', marginBottom: 16 }}>{stopError}</p>}
              {activityError && <p style={{ color: 'var(--primary)', marginBottom: 16 }}>{activityError}</p>}

              <div className="itinerary-card">
                <h2 style={{ marginBottom: 16 }}>Add Stop</h2>
                <form onSubmit={handleAddStop} style={{ display: 'flex', gap: 12 }}>
                  <input name="location" type="text" className="input-field" placeholder="Location name" />
                  <button type="submit" className="btn-primary" disabled={stopLoading || relatedLoading}>{stopLoading ? 'Saving...' : 'Add Stop'}</button>
                </form>
                {stopFormError && <p style={{ color: 'var(--primary)', marginTop: 12 }}>{stopFormError}</p>}
              </div>

              {!relatedLoading && stops.map((stop) => {
                const activities = activitiesByStop[stop.id] || [];

                return (
                  <div key={stop.id} className="itinerary-card">
                    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <div>
                        <h2 style={{ fontSize: 28 }}>{getStopTitle(stop)}</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Stop {getStopOrder(stop) + 1}</p>
                      </div>
                      <button type="button" className="btn-secondary" onClick={() => handleDeleteStop(stop.id)} disabled={stopLoading}>{stopLoading ? 'Saving...' : 'Delete Stop'}</button>
                    </header>

                    {activities.length === 0 && <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>No activities added yet.</p>}
                    {activities.map((activity) => (
                      <div key={activity.id} className="activity-row">
                        <div className="activity-dot">+</div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: 18 }}>{activity.title}</h3>
                          <p style={{ color: 'var(--text-muted)' }}>{getActivityDescription(activity)}</p>
                        </div>
                        <button type="button" className="btn-secondary" onClick={() => handleRemoveActivity(activity.id)} disabled={activityLoading}>{activityLoading ? 'Saving...' : 'Remove'}</button>
                      </div>
                    ))}

                    <form onSubmit={(event) => handleAddActivity(event, stop.id)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, marginTop: 20 }}>
                      <input name="title" type="text" className="input-field" placeholder="Activity name" />
                      <input name="notes" type="text" className="input-field" placeholder="Duration or notes" />
                      <button type="submit" className="btn-primary" disabled={activityLoading}>{activityLoading ? 'Saving...' : 'Add Activity'}</button>
                      {activityFormErrors[stop.id] && <p style={{ color: 'var(--primary)', gridColumn: '1 / -1' }}>{activityFormErrors[stop.id]}</p>}
                    </form>
                  </div>
                );
              })}
            </section>
          </div>
        </motion.div>
      </main>
    </>
  );
}
