import Link from 'next/link';

export default function Login() {
  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
        
        <form>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" className="input-field" placeholder="you@example.com" />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          
          <div className="flex-between" style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <input type="checkbox" /> Remember me
            </label>
            <Link href="#" style={{ color: 'var(--primary-color)' }}>Forgot Password?</Link>
          </div>
          
          <Link href="/dashboard" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
            Sign In
          </Link>
          
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Don't have an account? <Link href="#" style={{ color: 'var(--accent-color)' }}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
