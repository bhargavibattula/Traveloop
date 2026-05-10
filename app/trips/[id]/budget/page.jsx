import Link from 'next/link';

export default function BudgetView({ params }) {
  const healthScore = 82; // Example score
  const healthColor = healthScore >= 80 ? 'var(--sage)' : healthScore >= 60 ? 'var(--gold)' : 'var(--coral)';

  const categories = [
    { label: 'Transport', spent: '$1,240', target: '$1,500', percentage: 82, color: 'var(--ocean)' },
    { label: 'Stay', spent: '$2,850', target: '$3,000', percentage: 95, color: 'var(--gold)' },
    { label: 'Activities', spent: '$420', target: '$800', percentage: 52, color: 'var(--sage)' },
    { label: 'Food', spent: '$680', target: '$1,000', percentage: 68, color: 'var(--stone)' },
  ];

  return (
    <div className="animate-up">
      <header className="section-header">
        <Link href={`/trips/${params.id}`} style={{ color: 'var(--slate)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Santorini Trip
        </Link>
        <span className="eyebrow">Financial Insights</span>
        <h1 className="page-title">Budget Health Analysis</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        {/* Left Side: Score Gauge */}
        <section className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '240px', height: '240px', margin: '0 auto 32px' }}>
            <svg width="240" height="240" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="6" />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke={healthColor} 
                strokeWidth="6" 
                strokeDasharray={`${healthScore * 2.827} 282.7`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dasharray 1s ease-out' }}
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="serif" style={{ fontSize: '64px', lineHeight: '1', color: 'var(--ink)' }}>{healthScore}</div>
              <div style={{ fontSize: '12px', color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Health Score</div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <div className="mono" style={{ fontSize: '18px', fontWeight: '600' }}>$5,190</div>
              <div style={{ fontSize: '11px', color: 'var(--slate)', textTransform: 'uppercase' }}>Spent</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: '18px', fontWeight: '600' }}>$6,300</div>
              <div style={{ fontSize: '11px', color: 'var(--slate)', textTransform: 'uppercase' }}>Total</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: '18px', fontWeight: '600', color: 'var(--sage)' }}>$1,110</div>
              <div style={{ fontSize: '11px', color: 'var(--slate)', textTransform: 'uppercase' }}>Remaining</div>
            </div>
          </div>
        </section>

        {/* Right Side: Category Breakdown */}
        <section className="card" style={{ padding: '40px' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '32px' }}>Category Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {categories.map((cat, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '500' }}>{cat.label}</div>
                    <div className="mono" style={{ fontSize: '13px', color: 'var(--slate)' }}>{cat.spent} / {cat.target}</div>
                  </div>
                  <div className="mono" style={{ fontSize: '14px', fontWeight: '600' }}>{cat.percentage}%</div>
                </div>
                <div style={{ height: '8px', background: 'var(--cream-dark)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${cat.percentage}%`, 
                    background: cat.color,
                    borderRadius: '100px',
                    transition: 'width 1s ease-out'
                  }}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px', padding: '24px', background: 'var(--coral-light)', borderRadius: '12px', border: '1px solid rgba(232,84,60,0.1)', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--coral)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: 'var(--coral)', fontSize: '14px' }}>Budget Alert: Stay Overspent</div>
              <p style={{ fontSize: '13px', color: 'rgba(232,84,60,0.8)' }}>Your hotel bookings are currently at 95% of your target budget for this category.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
