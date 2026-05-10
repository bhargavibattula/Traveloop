import Link from 'next/link';

export default function SharedItinerary({ params }) {
  return (
    <div className="container animate-fade-in">
      <div className="glass" style={{ padding: '1rem 2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--primary-color)' }}>
        <div>
          <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Public View:</span> You are viewing a shared itinerary by John Doe.
        </div>
        <button className="btn btn-primary">Copy to My Trips</button>
      </div>

      <div className="page-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="page-title" style={{ fontSize: '3rem' }}>Euro Trip 2026</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Oct 12 - Oct 25 • 3 Destinations</p>
      </div>

      <div className="glass" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Paris, France</h2>
        
        <div style={{ padding: '2rem 0' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Day 1 • Oct 12</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--surface-color)' }}>
            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '1.1rem' }}>Check-in to Hotel</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Le Meurice, 228 Rue de Rivoli</p>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '1.1rem' }}>Eiffel Tower Visit</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sunset viewing and dinner at Madame Brasserie</p>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', paddingTop: '2rem' }}>Amsterdam, Netherlands</h2>
        <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          Log in or sign up to copy this trip and see full details!
        </div>
      </div>
    </div>
  );
}
