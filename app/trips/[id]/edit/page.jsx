import Link from 'next/link';

export default function ItineraryBuilder({ params }) {
  return (
    <div className="container animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <Link href="/trips/1" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>← Back to Itinerary</Link>
          <h1 className="page-title">Builder: Euro Trip 2026</h1>
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        {/* Builder Area */}
        <div>
          <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Paris, France (Oct 12 - 15)</h2>
              <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Change Dates</button>
            </div>

            <div style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '2rem', textAlign: 'center', marginBottom: '1rem' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Drag and drop activities here or add new ones.</p>
              <button className="btn btn-primary">+ Add Activity</button>
            </div>
            
            <div className="glass" style={{ padding: '1rem 1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)' }}>
              <div style={{ cursor: 'grab', color: 'var(--text-muted)' }}>☰</div>
              <input type="time" defaultValue="14:00" className="input-field" style={{ width: 'auto', padding: '0.5rem', marginBottom: 0 }} />
              <input type="text" defaultValue="Check-in to Hotel" className="input-field" style={{ flex: 1, padding: '0.5rem', marginBottom: 0 }} />
              <input type="text" defaultValue="Le Meurice" placeholder="Location/Notes" className="input-field" style={{ flex: 1, padding: '0.5rem', marginBottom: 0 }} />
              <input type="number" placeholder="Cost ($)" className="input-field" style={{ width: '100px', padding: '0.5rem', marginBottom: 0 }} />
              <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
            </div>
          </div>

          <button className="btn btn-outline" style={{ width: '100%', padding: '1rem', borderStyle: 'dashed' }}>
            + Add Another Destination
          </button>
        </div>

        {/* Search Panel */}
        <div className="glass" style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Discover</h3>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}>Activities</button>
            <button className="btn btn-outline" style={{ flex: 1, padding: '0.5rem' }}>Places</button>
            <button className="btn btn-outline" style={{ flex: 1, padding: '0.5rem' }}>Hotels</button>
          </div>
          <input type="text" className="input-field" placeholder="Search for Eiffel Tower..." style={{ marginBottom: '1rem' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Louvre Museum</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Art Museum • 2-3 hours • $20</p>
                <button className="btn btn-outline" style={{ width: '100%', padding: '0.25rem' }}>+ Add to Trip</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
