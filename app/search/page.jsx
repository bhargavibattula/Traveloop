import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="container animate-fade-in">
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="page-title">Discover the World</h1>
        <p style={{ color: 'var(--text-muted)' }}>Search for cities, activities, and destinations to add to your trip.</p>
        
        <div style={{ maxWidth: '600px', margin: '2rem auto 0', display: 'flex', gap: '1rem' }}>
          <input type="text" className="input-field" placeholder="Search places, activities, or cities..." style={{ marginBottom: 0, flex: 1, padding: '1rem', fontSize: '1.1rem' }} />
          <button className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Search</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn btn-primary" style={{ borderRadius: '2rem' }}>All</button>
        <button className="btn btn-outline" style={{ borderRadius: '2rem' }}>Cities</button>
        <button className="btn btn-outline" style={{ borderRadius: '2rem' }}>Activities</button>
        <button className="btn btn-outline" style={{ borderRadius: '2rem' }}>Hotels</button>
      </div>

      <h2 style={{ marginBottom: '1.5rem' }}>Popular Cities</h2>
      <div className="dashboard-grid">
        <div className="glass trip-card" style={{ padding: '1rem' }}>
          <div style={{ height: '150px', background: 'url(https://source.unsplash.com/400x300/?tokyo) center/cover', borderRadius: '8px', marginBottom: '1rem' }}></div>
          <h3 style={{ fontSize: '1.2rem' }}>Tokyo, Japan</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Vibrant city mixing ultramodern with traditional.</p>
          <button className="btn btn-outline" style={{ width: '100%', padding: '0.5rem' }}>+ Add to Trip</button>
        </div>
        <div className="glass trip-card" style={{ padding: '1rem' }}>
          <div style={{ height: '150px', background: 'url(https://source.unsplash.com/400x300/?rome) center/cover', borderRadius: '8px', marginBottom: '1rem' }}></div>
          <h3 style={{ fontSize: '1.2rem' }}>Rome, Italy</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Capital city famous for its nearly 3,000 years of globally influential art.</p>
          <button className="btn btn-outline" style={{ width: '100%', padding: '0.5rem' }}>+ Add to Trip</button>
        </div>
      </div>

      <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Top Activities</h2>
      <div className="dashboard-grid">
        <div className="glass trip-card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: 'url(https://source.unsplash.com/100x100/?museum) center/cover', borderRadius: '8px' }}></div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.1rem' }}>Louvre Museum Tour</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Paris, France • $25</p>
          </div>
        </div>
        <div className="glass trip-card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: 'url(https://source.unsplash.com/100x100/?sushi) center/cover', borderRadius: '8px' }}></div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.1rem' }}>Sushi Making Class</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Tokyo, Japan • $60</p>
          </div>
        </div>
      </div>
    </div>
  );
}
