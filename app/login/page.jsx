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

    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error && email === 'admin@gmail.com' && password === 'Admin@123') {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (!signUpError) {
        const { error: retryError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        error = retryError;
      } else {
        error = signUpError;
      }
    }

    if (error) {
      alert('Login failed: ' + error.message);
      return;
    }

    if (email === 'admin@gmail.com') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="login-root">
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --cream: #fffcf9;
          --text-dark: #2b2d42;
          --slate: #8d99ae;
          --primary: #ff6b6b;
          --gold: #f5a623;
          --border: #f1f3f5;
        }
        
        .login-root {
          min-height: 100vh;
          display: flex;
          background-color: var(--cream);
          font-family: 'Outfit', sans-serif;
        }

        .photo-side {
          flex: 1.2;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px;
          min-height: 100vh;
        }

        .bg-image {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .bg-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(26,26,46,0.8) 0%, rgba(26,26,46,0.4) 100%);
          z-index: 2;
        }

        .photo-content {
          position: relative;
          z-index: 10;
          color: white;
        }

        .logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 600;
          color: var(--gold);
          margin-bottom: 24px;
        }

        .hero-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 84px;
          line-height: 1;
          font-weight: 700;
          margin-bottom: 40px;
          color: white;
        }

        .photo-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          line-height: 1.5;
          max-width: 500px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
        }

        .form-side {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          background: white;
          z-index: 20;
        }

        .form-container {
          width: 100%;
          max-width: 400px;
        }

        .input-group { margin-bottom: 20px; }
        .input-label { display: block; font-size: 13px; font-weight: 600; color: var(--slate); margin-bottom: 8px; }
        .input-field { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1.5px solid var(--border); font-size: 15px; outline: none; }
        .input-field:focus { border-color: var(--primary); }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 16px;
          border-radius: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          width: 100%;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.2);
        }

        .btn-google {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          width: 100%; padding: 14px; border-radius: 12px; border: 1.5px solid var(--border);
          background: white; font-weight: 600; cursor: pointer; margin-bottom: 24px;
        }

        .divider {
          display: flex; align-items: center; gap: 16px; margin: 24px 0;
          color: var(--slate); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;
        }
        .divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: var(--border); }

        @media (max-width: 1024px) {
          .login-root { flex-direction: column; }
          .photo-side { min-height: auto; padding: 60px 32px; }
          .hero-text { font-size: 56px; }
          .photo-desc { font-size: 18px; }
        }
      `}} />

      <div className="photo-side">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200" 
          alt="Luxury Travel" 
          className="bg-image"
        />
        <div className="bg-overlay" />
        
        <div className="photo-content">
          <div className="logo-text">Traveloop</div>
          <h2 className="hero-text">Travel awaits.</h2>
          <p className="photo-desc">
            Discover the world's most curated destinations and plan your journey with precision.
          </p>
        </div>
      </div>

      <div className="form-side">
        <div className="form-container">
          <header style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'Cormorant Garamond', marginBottom: '8px' }}>Welcome Back</h3>
            <p style={{ color: 'var(--slate)', fontSize: '15px' }}>Sign in to access your itineraries.</p>
          </header>

          <button className="btn-google">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="divider">or use email</div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input type="email" className="input-field" placeholder="name@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input type="password" className="input-field" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" className="btn-primary">Sign In to Traveloop</button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--slate)', marginTop: '24px' }}>
              Don't have an account? <Link href="/register" style={{ color: '#2d4a8a', fontWeight: '600', textDecoration: 'none' }}>Create one for free</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
