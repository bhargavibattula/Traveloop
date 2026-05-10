import Link from 'next/link';

export default function ItineraryView({ params }) {
  return (
    <div className="container animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <Link href="/dashboard" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>← Back to Dashboard</Link>
          <h1 className="page-title">Euro Trip 2026</h1>
          <p style={{ color: 'var(--text-muted)' }}>Oct 12 - Oct 25 • 3 Destinations • 2 Travelers</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href={`/trips/1/edit`} className="btn btn-outline">Edit Itinerary</Link>
          <Link href={`/trips/1/budget`} className="btn btn-primary">Budget</Link>
          <Link href={`/trips/1/checklist`} className="btn btn-primary">Checklist</Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        {/* Sidebar / Timeline */}
        <div style={{ width: '250px', flexShrink: 0 }}>
          <div className="glass" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Destinations</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', color: 'var(--primary-color)' }}>Paris (4 Days)</li>
              <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>Amsterdam (3 Days)</li>
              <li style={{ padding: '0.5rem 0' }}>Berlin (4 Days)</li>
            </ul>
          </div>
        </div>

        {/* Main Itinerary */}
        <div style={{ flex: 1 }}>
          <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Paris, France</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Oct 12 - Oct 15</p>

            {/* Day 1 */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ background: 'var(--primary-color)', color: '#fff', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>Day 1</span>
                <span>Oct 12 - Arrival & Exploration</span>
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '2rem', borderLeft: '2px solid var(--border-color)' }}>
                <div className="glass" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '80px', flexShrink: 0, fontWeight: '600', color: 'var(--text-muted)' }}>14:00</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Check-in to Hotel</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Le Meurice, 228 Rue de Rivoli</p>
                  </div>
                  <div style={{ marginLeft: 'auto', fontWeight: '600', color: 'var(--success)' }}>Paid</div>
                </div>

                <div className="glass" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '80px', flexShrink: 0, fontWeight: '600', color: 'var(--text-muted)' }}>16:00</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Eiffel Tower Visit</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sunset viewing and dinner at Madame Brasserie</p>
                  </div>
                  <div style={{ marginLeft: 'auto', fontWeight: '600' }}>$120</div>
                </div>
              </div>
            </div>
            
            {/* Additional days would go here */}
            <button className="btn btn-outline" style={{ width: '100%' }}>View Full Paris Itinerary</button>
          </div>
        </div>
      </div>
    </div>
  );
}
