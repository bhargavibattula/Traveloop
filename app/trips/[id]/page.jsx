import Link from 'next/link';
import { getTripById } from '@/services/trip.service';

export default async function ItineraryView({ params }) {
  let trip = null;

  try {
    trip = await getTripById(params.id);
  } catch (err) {
    console.error('Failed to fetch trip:', err);
  }

  if (!trip) return <div>Trip not found</div>;

  const day1Activities = [
    { time: '09:00', title: 'Arrival at Leonardo da Vinci–Fiumicino Airport', category: 'Transport', cost: '$0', icon: 'M5 13l4 4L19 7' },
    { time: '11:30', title: 'Check-in: Hotel de Russie', category: 'Stay', cost: '$850', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { time: '14:30', title: 'Walking Tour: Spanish Steps & Trevi Fountain', category: 'Activity', cost: '$45', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { time: '19:30', title: 'Welcome Dinner at Aroma Restaurant', category: 'Food', cost: '$180', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707' },
  ];

  return (
    <div className="animate-up">
      <header className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <span className="eyebrow">Itinerary Details</span>
          <h1 className="page-title">{trip.title}</h1>
          <p className="page-subtitle">{trip.start_date || 'TBD'} - {trip.end_date || 'TBD'} · 4 Stops</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href={`/trips/${trip.id}/edit`} className="btn btn-secondary">Edit Itinerary</Link>
          <Link href={`/trips/${trip.id}/budget`} className="btn btn-primary">View Budget</Link>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px', marginTop: '48px' }}>
        {/* Timeline Sidebar */}
        <aside>
          <div className="card" style={{ position: 'sticky', top: '48px', padding: '32px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '24px' }}>Trip Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }}></div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--slate)' }}>Aug 12 - 15</div>
                  <div style={{ fontWeight: '500' }}>Rome, Italy</div>
                </div>
              </div>
              <div style={{ borderLeft: '2px solid var(--border)', marginLeft: '3px', height: '20px' }}></div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--stone)' }}></div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--slate)' }}>Aug 15 - 18</div>
                  <div style={{ fontWeight: '500' }}>Santorini, Greece</div>
                </div>
              </div>
              <div style={{ borderLeft: '2px solid var(--border)', marginLeft: '3px', height: '20px' }}></div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--stone)' }}></div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--slate)' }}>Aug 18 - 20</div>
                  <div style={{ fontWeight: '500' }}>Athens, Greece</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Itinerary Blocks */}
        <section>
          <div className="card" style={{ borderLeft: '4px solid var(--gold)', marginBottom: '32px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '32px' }}>Day 1 · Rome</h2>
                <p style={{ color: 'var(--slate)', fontSize: '14px' }}>Wednesday, August 12</p>
              </div>
              <span className="tag tag-gold">Arrival Day</span>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {day1Activities.map((act, i) => (
                <div key={i} style={{ display: 'flex', gap: '24px', position: 'relative', paddingBottom: '32px' }}>
                  {/* Timeline Line */}
                  {i < day1Activities.length - 1 && (
                    <div style={{ position: 'absolute', left: '15px', top: '32px', bottom: '0', width: '2px', background: 'var(--border)' }}></div>
                  )}
                  
                  {/* Icon Dot */}
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: 'var(--ocean-light)', 
                    color: 'var(--ocean)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 1
                  }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d={act.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Activity Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '13px', color: 'var(--slate)', fontWeight: '500', marginBottom: '2px' }}>{act.time}</div>
                        <h4 style={{ fontSize: '18px', fontFamily: 'Outfit', fontWeight: '500' }}>{act.title}</h4>
                      </div>
                      <span className="mono" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)' }}>{act.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-secondary" style={{ width: '100%', borderStyle: 'dashed', marginTop: '16px', justifyContent: 'center' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Add Activity to Day 1
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
