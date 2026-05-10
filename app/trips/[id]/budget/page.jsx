import Link from 'next/link';

export default function TripBudget({ params }) {
  return (
    <div className="container animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <Link href="/trips/1" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>← Back to Itinerary</Link>
          <h1 className="page-title">Budget: Euro Trip</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Estimated Cost</p>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>$2,450</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>Cost Breakdown</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <span>Flights & Transport</span>
                <span style={{ fontWeight: '600' }}>$1,200</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--surface-color)', borderRadius: '4px' }}>
                <div style={{ width: '50%', height: '100%', background: 'var(--primary-color)', borderRadius: '4px' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <span>Accommodation</span>
                <span style={{ fontWeight: '600' }}>$850</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--surface-color)', borderRadius: '4px' }}>
                <div style={{ width: '35%', height: '100%', background: 'var(--accent-color)', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <span>Activities</span>
                <span style={{ fontWeight: '600' }}>$250</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--surface-color)', borderRadius: '4px' }}>
                <div style={{ width: '10%', height: '100%', background: 'var(--success)', borderRadius: '4px' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <span>Meals (Est.)</span>
                <span style={{ fontWeight: '600' }}>$150</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--surface-color)', borderRadius: '4px' }}>
                <div style={{ width: '5%', height: '100%', background: '#fbbf24', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <h3>Detailed Expenses</h3>
            <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>+ Add Expense</button>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem 0' }}>Item</th>
                <th style={{ padding: '1rem 0' }}>Category</th>
                <th style={{ padding: '1rem 0', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>Roundtrip Flight (JFK - CDG)</td>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>Transport</td>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>$900</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>Le Meurice (3 nights)</td>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>Stay</td>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>$600</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>Eiffel Tower Tickets</td>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>Activity</td>
                <td style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>$50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
