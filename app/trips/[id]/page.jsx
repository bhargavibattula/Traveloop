"use client";

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useActivityMutations } from '@/hooks/useActivities';
import { useStopMutations } from '@/hooks/useStops';
import { useTripById } from '@/hooks/useTrips';

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
  const {
    addActivity,
    removeActivity,
    loading: activityLoading,
    error: activityError,
  } = useActivityMutations();
  const [stops, setStops] = useState([]);
  const [activitiesByStop, setActivitiesByStop] = useState({});
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedError, setRelatedError] = useState(null);
  const [stopFormError, setStopFormError] = useState(null);
  const [activityFormErrors, setActivityFormErrors] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  const refetchPage = useCallback(async () => {
    await refetch();
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
        const { data: fetchedStops, error: stopsError } = await supabase
          .from('trip_stops')
          .select('*')
          .eq('trip_id', id)
          .order('position', { ascending: true });

        if (stopsError) {
          throw new Error(stopsError.message);
        }

        const stopIds = (fetchedStops || []).map((stop) => stop.id);
        let fetchedActivities = [];

        if (stopIds.length > 0) {
          const { data: activityData, error: activitiesError } = await supabase
            .from('trip_activities')
            .select('*')
            .in('stop_id', stopIds)
            .order('position', { ascending: true });

          if (activitiesError) {
            throw new Error(activitiesError.message);
          }

          fetchedActivities = activityData || [];
        }

        if (mounted) {
          setStops(fetchedStops || []);
          setActivitiesByStop(
            fetchedActivities.reduce((groupedActivities, activity) => {
              const stopId = activity.stop_id;

              if (!stopId) {
                return groupedActivities;
              }

              return {
                ...groupedActivities,
                [stopId]: [...(groupedActivities[stopId] || []), activity],
              };
            }, {}),
          );
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
  }, [id, refreshKey, trip]);

  async function handleAddStop(event) {
    event.preventDefault();
    setStopFormError(null);

    const formData = new FormData(event.currentTarget);
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
      event.currentTarget.reset();
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
    setActivityFormErrors((currentErrors) => ({ ...currentErrors, [stopId]: null }));

    const formData = new FormData(event.currentTarget);
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
        notes,
        position: activitiesByStop[stopId]?.length || 0,
      });
      event.currentTarget.reset();
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

  if (loading) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading trip...</p>
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
    <div className="animate-up">
      <header className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <span className="eyebrow">Itinerary Details</span>
          <h1 className="page-title">{trip.title}</h1>
          <p className="page-subtitle">{formatDateRange(trip.start_date, trip.end_date)} · {stops.length} Stops</p>
          {trip.destination && <p className="page-subtitle">{trip.destination}</p>}
          {trip.description && <p style={{ color: 'var(--slate)', marginTop: '12px', maxWidth: '720px' }}>{trip.description}</p>}
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href={`/trips/${id}/edit`} className="btn btn-secondary">Edit Itinerary</Link>
          <Link href={`/trips/${id}/budget`} className="btn btn-primary">View Budget</Link>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px', marginTop: '48px' }}>
        <aside>
          <div className="card" style={{ position: 'sticky', top: '48px', padding: '32px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '24px' }}>Trip Overview</h3>
            {relatedLoading && <p style={{ color: 'var(--slate)' }}>Loading stops...</p>}
            {!relatedLoading && stops.length === 0 && <p style={{ color: 'var(--slate)' }}>No stops added yet.</p>}
            {!relatedLoading && stops.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {stops.map((stop) => (
                  <div key={stop.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }}></div>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--slate)' }}>Stop {getStopOrder(stop) + 1}</div>
                      <div style={{ fontWeight: '500' }}>{getStopTitle(stop)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        <section>
          {relatedError && <p style={{ color: 'var(--danger)', marginBottom: '16px' }}>{relatedError}</p>}
          {stopError && <p style={{ color: 'var(--danger)', marginBottom: '16px' }}>{stopError}</p>}
          {activityError && <p style={{ color: 'var(--danger)', marginBottom: '16px' }}>{activityError}</p>}

          <div className="card" style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Add Stop</h2>
            <form onSubmit={handleAddStop} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input name="location" type="text" className="input-field" placeholder="Location name" style={{ flex: 1, marginBottom: 0 }} />
              <button type="submit" className="btn btn-secondary" disabled={stopLoading}>
                {stopLoading ? 'Saving...' : 'Add Stop'}
              </button>
            </form>
            {stopFormError && <p style={{ color: 'var(--danger)', marginTop: '12px' }}>{stopFormError}</p>}
          </div>

          {!relatedLoading && stops.map((stop) => {
            const activities = activitiesByStop[stop.id] || [];

            return (
              <div key={stop.id} className="card" style={{ borderLeft: '4px solid var(--gold)', marginBottom: '32px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <div>
                    <h2 style={{ fontSize: '32px' }}>{getStopTitle(stop)}</h2>
                    <p style={{ color: 'var(--slate)', fontSize: '14px' }}>Stop {getStopOrder(stop) + 1}</p>
                  </div>
                  <button type="button" className="btn btn-secondary" onClick={() => handleDeleteStop(stop.id)} disabled={stopLoading}>
                    {stopLoading ? 'Saving...' : 'Delete Stop'}
                  </button>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {activities.length === 0 && <p style={{ color: 'var(--slate)', marginBottom: '24px' }}>No activities added yet.</p>}
                  {activities.map((activity, activityIndex) => (
                    <div key={activity.id} style={{ display: 'flex', gap: '24px', position: 'relative', paddingBottom: '32px' }}>
                      {activityIndex < activities.length - 1 && (
                        <div style={{ position: 'absolute', left: '15px', top: '32px', bottom: '0', width: '2px', background: 'var(--border)' }}></div>
                      )}
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--ocean-light)', color: 'var(--ocean)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                          <div>
                            <h4 style={{ fontSize: '18px', fontFamily: 'Outfit', fontWeight: '500' }}>{activity.title}</h4>
                            <p style={{ color: 'var(--slate)', fontSize: '14px' }}>{getActivityDescription(activity)}</p>
                          </div>
                          <button type="button" className="btn btn-secondary" onClick={() => handleRemoveActivity(activity.id)} disabled={activityLoading}>
                            {activityLoading ? 'Saving...' : 'Remove'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={(event) => handleAddActivity(event, stop.id)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', alignItems: 'center', marginTop: '16px' }}>
                  <input name="title" type="text" className="input-field" placeholder="Activity name" style={{ marginBottom: 0 }} />
                  <input name="notes" type="text" className="input-field" placeholder="Duration or notes" style={{ marginBottom: 0 }} />
                  <button type="submit" className="btn btn-secondary" disabled={activityLoading}>
                    {activityLoading ? 'Saving...' : 'Add Activity'}
                  </button>
                  {activityFormErrors[stop.id] && (
                    <p style={{ color: 'var(--danger)', gridColumn: '1 / -1' }}>{activityFormErrors[stop.id]}</p>
                  )}
                </form>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
