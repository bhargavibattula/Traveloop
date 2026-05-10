import Link from 'next/link';

export default function CreateTrip() {
  return (
    <div className="container animate-fade-in">
      <div className="page-header">
        <Link href="/dashboard" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>← Back to Dashboard</Link>
        <h1 className="page-title">Create New Trip</h1>
        <p style={{ color: 'var(--text-muted)' }}>Start designing your perfect journey.</p>
      </div>

      <div className="glass" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <form>
          <div className="input-group">
            <label className="input-label">Trip Name</label>
            <input type="text" className="input-field" placeholder="e.g., Summer in Japan 2026" style={{ fontSize: '1.2rem', padding: '1rem' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label">Start Date</label>
              <input type="date" className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label">End Date</label>
              <input type="date" className="input-field" />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Description (Optional)</label>
            <textarea className="input-field" rows="4" placeholder="What is the main goal of this trip?"></textarea>
          </div>

          <div className="input-group">
            <label className="input-label">Cover Photo</label>
            <div style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Click to upload or drag and drop<br />
              <span style={{ fontSize: '0.8rem' }}>SVG, PNG, JPG or GIF (max. 800x400px)</span>
            </div>
          </div>

          <div className="flex-between" style={{ marginTop: '3rem' }}>
            <Link href="/dashboard" className="btn btn-outline">Cancel</Link>
            <Link href="/trips/1/edit" className="btn btn-primary">Save & Build Itinerary</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
