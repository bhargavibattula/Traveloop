'use client';

import { useEffect } from 'react';
import { RefreshCcw, Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const T = {
  cream: '#fffcf9',
  peach: '#fff0e6',
  coral: '#ff6b6b',
  navy: '#2b2d42',
  muted: '#8d99ae',
};

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Root Error:', error);
  }, [error]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: T.cream,
      fontFamily: 'Outfit, sans-serif',
      color: T.navy,
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '60px',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
        maxWidth: '500px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: T.peach,
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <AlertCircle size={40} color={T.coral} />
        </div>
        
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>Something went wrong</h1>
        <p style={{ color: T.muted, marginBottom: '40px', lineHeight: '1.6' }}>
          We encountered an unexpected error while preparing your journey. Don't worry, your data is safe.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => reset()}
            style={{
              padding: '14px 28px',
              borderRadius: '16px',
              border: 'none',
              background: T.navy,
              color: 'white',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <RefreshCcw size={18} /> Try Again
          </button>
          
          <Link href="/dashboard" style={{
            padding: '14px 28px',
            borderRadius: '16px',
            border: `1px solid ${T.navy}`,
            background: 'transparent',
            color: T.navy,
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Home size={18} /> Dashboard
          </Link>
        </div>
      </div>
      
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(0,0,0,0.05)',
          borderRadius: '12px',
          fontSize: '12px',
          fontFamily: 'monospace',
          maxWidth: '800px',
          overflowX: 'auto',
          color: '#666'
        }}>
          {error.message}
        </div>
      )}
    </div>
  );
}
