import Link from 'next/link';

export default function TripNotes({ params }) {
  return (
    <div className="container animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <Link href="/trips/1" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>← Back to Itinerary</Link>
          <h1 className="page-title">Trip Notes & Journal</h1>
          <p style={{ color: 'var(--text-muted)' }}>Euro Trip (Oct 12 - Oct 25)</p>
        </div>
        <button className="btn btn-primary">+ New Note</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass" style={{ padding: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }}>Visa Requirements</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sep 15, 2025</span>
            </div>
            <p style={{ color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
              Need to apply for Schengen Visa by next month. 
              Required documents:
              - Bank statements
              - Flight itinerary
              - Hotel bookings
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Edit</button>
              <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}>Delete</button>
            </div>
          </div>

          <div className="glass" style={{ padding: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }}>Restaurant Recommendations - Paris</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sep 18, 2025</span>
            </div>
            <p style={{ color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
              1. Le Relais de l'Entrecôte - famous steak frites!
              2. Pink Mamma - great Italian, need to book 3 weeks in advance.
              3. L'As du Fallafel - quick lunch in Le Marais.
            </p>
          </div>
        </div>

        <div className="glass" style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Filter Notes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="radio" name="filter" defaultChecked /> All Notes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="radio" name="filter" /> General
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="radio" name="filter" /> Paris
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="radio" name="filter" /> Amsterdam
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
