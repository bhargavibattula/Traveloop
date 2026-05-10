import Link from 'next/link';

export default function UserProfile() {
  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
      <div className="page-header">
        <h1 className="page-title">Profile Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your account and preferences.</p>
      </div>

      <div className="glass" style={{ padding: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5rem', fontWeight: '700' }}>
            JD
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem' }}>John Doe</h2>
            <p style={{ color: 'var(--text-muted)' }}>john.doe@example.com</p>
            <button className="btn btn-outline" style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Change Avatar</button>
          </div>
        </div>

        <form>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input type="text" className="input-field" defaultValue="John Doe" />
          </div>
          
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" className="input-field" defaultValue="john.doe@example.com" />
          </div>

          <div className="input-group">
            <label className="input-label">Language Preference</label>
            <select className="input-field">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Japanese</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Currency</label>
            <select className="input-field">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>JPY (¥)</option>
            </select>
          </div>

          <div className="flex-between" style={{ marginTop: '3rem' }}>
            <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Delete Account</button>
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
