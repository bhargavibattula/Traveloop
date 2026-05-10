'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 1000, 
      display: 'flex',
      backgroundColor: 'var(--cream)'
    }}>
      {/* Left Photo Side */}
      <div style={{ 
        flex: 1, 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        color: 'white'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200" 
          alt="Luxury Travel" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            zIndex: -1
          }}
        />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'linear-gradient(135deg, rgba(26,26,46,0.8) 0%, rgba(26,26,46,0.3) 100%)',
          zIndex: -1
        }} />
        
        <h1 className="serif" style={{ fontSize: '28px', color: 'var(--gold)', marginBottom: '16px' }}>Traveloop</h1>
        <h2 className="serif" style={{ fontSize: '64px', maxWidth: '500px', lineHeight: '1', color: 'white' }}>Travel awaits.</h2>
        <p style={{ fontSize: '18px', maxWidth: '400px', marginTop: '24px', opacity: 0.8 }}>
          Discover the world's most curated destinations and plan your journey with precision.
        </p>
      </div>

      {/* Right Form Side */}
      <div style={{ 
        width: '500px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div className="animate-up" style={{ width: '100%', maxWidth: '380px' }}>
          <header style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome Back</h3>
            <p style={{ color: 'var(--slate)', fontSize: '15px' }}>Sign in to continue your journey.</p>
          </header>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <button type="button" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '8px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
              <span style={{ fontSize: '12px', color: 'var(--stone)', textTransform: 'uppercase' }}>or email</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--slate)' }}>Email Address</label>
              <input type="email" placeholder="name@domain.com" value={email} onChange={(event) => setEmail(event.target.value)} style={{ 
                padding: '12px 16px', 
                borderRadius: '10px', 
                border: '1.5px solid var(--border)',
                fontSize: '15px',
                outline: 'none'
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--slate)' }}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} style={{ 
                padding: '12px 16px', 
                borderRadius: '10px', 
                border: '1.5px solid var(--border)',
                fontSize: '15px',
                outline: 'none'
              }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '8px' }}>
              Sign In to Traveloop
            </button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--slate)', marginTop: '16px' }}>
              New to Traveloop? <Link href="/register" style={{ color: 'var(--ocean)', fontWeight: '500' }}>Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
