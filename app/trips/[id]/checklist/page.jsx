import Link from 'next/link';

export default function PackingChecklist({ params }) {
  return (
    <div className="container animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <Link href={`/trips/${params.id}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>← Back to Itinerary</Link>
          <h1 className="page-title">Packing Checklist</h1>
          <p style={{ color: 'var(--text-muted)' }}>Euro Trip (Oct 12 - Oct 25)</p>
        </div>
        <button type="button" className="btn btn-primary">+ Add Item</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--primary-color)' }}>Documents & Essentials</h3>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>2 / 4 Packed</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="flex-between" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>
              <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>Passport</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex-between" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>
              <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>Flight Tickets</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex-between" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>
              <span>Travel Insurance</span>
              <input type="checkbox" />
            </label>
            <label className="flex-between" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>
              <span>Euros (Cash)</span>
              <input type="checkbox" />
            </label>
          </div>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--accent-color)' }}>Clothing</h3>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>0 / 5 Packed</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="flex-between" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>
              <span>T-shirts (x5)</span>
              <input type="checkbox" />
            </label>
            <label className="flex-between" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>
              <span>Jeans (x2)</span>
              <input type="checkbox" />
            </label>
            <label className="flex-between" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>
              <span>Comfortable Walking Shoes</span>
              <input type="checkbox" />
            </label>
            <label className="flex-between" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>
              <span>Light Jacket</span>
              <input type="checkbox" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
