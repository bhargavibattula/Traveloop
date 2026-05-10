import Link from 'next/link';

export default function Dashboard() {
  const stats = [
    { label: 'Total Trips', value: '12', color: 'var(--ocean-light)', iconColor: 'var(--ocean)' },
    { label: 'Countries Visited', value: '08', color: 'var(--gold-light)', iconColor: 'var(--gold)' },
    { label: 'Total Budget Spent', value: '$14.2k', color: 'var(--sage-light)', iconColor: 'var(--sage)' },
    { label: 'Upcoming Stops', value: '04', color: 'var(--coral-light)', iconColor: 'var(--coral)' },
  ];

  const recentTrips = [
    { id: 1, name: 'Summer in Santorini', dates: 'Aug 12 - Aug 20', stops: 4, budget: '$3,200', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Kyoto Cherry Blossom', dates: 'Mar 25 - Apr 02', stops: 3, budget: '$4,500', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Amalfi Coast Drive', dates: 'Jun 10 - Jun 18', stops: 5, budget: '$2,800', image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="animate-up">
      <header className="section-header">
        <span className="eyebrow">May 10, 2026</span>
        <h1 className="page-title">Good morning, John ✈️</h1>
        <p className="page-subtitle">You have 2 upcoming trips this month. Where to next?</p>
      </header>

      <section className="stat-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card" style={{ backgroundColor: stat.color }}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '64px' }}>
        <div className="flex-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <span className="eyebrow">Active Itineraries</span>
            <h2 style={{ fontSize: '32px' }}>Your Recent Journeys</h2>
          </div>
          <Link href="/trips" className="btn btn-secondary">View All Trips</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {recentTrips.map((trip) => (
            <div key={trip.id} className="card trip-card">
              <div className="trip-image-container">
                <img src={trip.image} alt={trip.name} className="trip-image" />
                <div className="trip-overlay">
                  <span className="trip-badge">{trip.stops} Stops</span>
                </div>
              </div>
              <div className="trip-body">
                <h3 className="serif" style={{ fontSize: '24px', marginBottom: '4px' }}>{trip.name}</h3>
                <p style={{ color: 'var(--slate)', fontSize: '13px' }}>{trip.dates}</p>
              </div>
              <div className="trip-footer">
                <span className="mono" style={{ fontWeight: '600', fontSize: '14px' }}>{trip.budget}</span>
                <Link href={`/trips/${trip.id}`} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  Explore Plan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <span className="eyebrow">Editorial Picks</span>
        <h2 style={{ fontSize: '32px', marginBottom: '32px' }}>Suggested Destinations</h2>
        
        <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '40px', alignItems: 'center' }}>
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200" 
            alt="Yosemite" 
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }}
          />
          <div>
            <span className="tag tag-gold" style={{ marginBottom: '16px' }}>Editor's Choice</span>
            <h3 style={{ fontSize: '40px', marginBottom: '16px' }}>Yosemite National Park</h3>
            <p style={{ color: 'var(--slate)', fontSize: '16px', marginBottom: '32px' }}>
              Experience the breathtaking beauty of California's most iconic wilderness. From the granite cliffs of El Capitan to the mist of Yosemite Falls, every corner is a masterpiece of nature.
            </p>
            <button className="btn btn-primary" style={{ padding: '12px 24px' }}>Plan Yosemite Trip</button>
          </div>
        </div>
      </section>
    </div>
  );
}
