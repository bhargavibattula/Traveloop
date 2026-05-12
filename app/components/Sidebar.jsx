"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  LayoutDashboard, 
  Sparkles, 
  Wand2, 
  Luggage, 
  CheckCircle2, 
  DollarSign,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'AI Features', icon: Sparkles, path: '/dashboard/ai-features' },
  { name: 'AI Planner', icon: Wand2, path: '/dashboard/ai-planner' },
  { name: 'My Trips', icon: Luggage, path: '/trips' },
  { name: 'Checklist', icon: CheckCircle2, path: '/dashboard/checklist' },
  { name: 'Budgets', icon: DollarSign, path: '/dashboard/budget' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Hide sidebar on landing, login, register, and admin pages
  useEffect(() => {
    const hiddenRoutes = ['/', '/login', '/register', '/admin'];
    setShowSidebar(!hiddenRoutes.includes(pathname));
  }, [pathname]);

  // Handle mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setIsOpen(false);
      else setIsOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!showSidebar) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --primary-coral: #ff6b6b;
          --primary-gradient: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
          --navy-dark: #2b2d42;
          --slate-muted: #8d99ae;
          --bg-cream: #fffcf9;
          --sidebar-width: 300px;
          --sidebar-collapsed: 90px;
        }

        .sidebar-container {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          background: white;
          border-right: 1px solid #f1f3f5;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          padding: 40px 20px;
          width: var(--sidebar-width);
        }

        .sidebar-container.collapsed {
          width: var(--sidebar-collapsed);
          padding: 40px 15px;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 15px;
          margin-bottom: 60px;
          text-decoration: none;
          color: var(--navy-dark);
          overflow: hidden;
          white-space: nowrap;
        }

        .logo-icon {
          min-width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--navy-dark);
        }

        .logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 20px;
          border-radius: 20px;
          color: var(--slate-muted);
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.3s ease;
          white-space: nowrap;
          position: relative;
        }

        .nav-link:hover {
          color: var(--primary-coral);
          background: #fffafa;
        }

        .nav-link.active {
          background: var(--primary-gradient);
          color: white;
          box-shadow: 0 15px 30px rgba(255, 107, 107, 0.3);
        }

        .nav-link.active .nav-link-icon {
          color: white;
        }

        .nav-link-icon {
          min-width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--slate-muted);
          transition: color 0.3s;
        }

        .toggle-btn {
          position: absolute;
          right: -12px;
          top: 40px;
          width: 24px;
          height: 24px;
          background: white;
          border: 1px solid #f1f3f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--slate-muted);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          z-index: 1001;
        }

        .mobile-toggle {
          display: none;
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1100;
          background: white;
          border: 1px solid #f1f3f5;
          padding: 10px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          cursor: pointer;
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
          z-index: 999;
        }

        @media (max-width: 1024px) {
          .sidebar-container {
            transform: translateX(-100%);
          }
          .sidebar-container.open {
            transform: translateX(0);
            width: 280px;
          }
          .mobile-toggle { display: block; }
          .sidebar-overlay.open { display: block; }
          .toggle-btn { display: none; }
        }

        /* Adjust main content padding globally */
        body {
          padding-left: ${showSidebar && !isMobile ? (isOpen ? '300px' : '90px') : '0'};
          transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}} />

      {isMobile && (
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {isMobile && <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />}

      <aside className={`sidebar-container ${!isOpen ? 'collapsed' : ''} ${isOpen && isMobile ? 'open' : ''}`}>
        {!isMobile && (
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        )}

        <Link href="/dashboard" className="sidebar-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
              <path d="M12 3v3"/>
              <path d="M19 12h3"/>
              <path d="M12 21v3"/>
              <path d="M5 12H2"/>
            </svg>
          </div>
          {isOpen && <span className="logo-text">Traveloop</span>}
        </Link>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path} 
                className={`nav-link ${isActive ? 'active' : ''}`}
                title={!isOpen ? item.name : ''}
              >
                <div className="nav-link-icon">
                  <Icon size={22} />
                </div>
                {isOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer" style={{ marginTop: 'auto', borderTop: '1px solid #f1f3f5', paddingTop: '24px' }}>
          <Link href="/profile" className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}>
            <div className="nav-link-icon"><Settings size={22} /></div>
            {isOpen && <span>Settings</span>}
          </Link>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/login');
            }}
            className="nav-link"
            style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', color: '#ff6b6b', textAlign: 'left' }}
          >
            <div className="nav-link-icon" style={{ color: '#ff6b6b' }}><LogOut size={22} /></div>
            {isOpen && <span>Log Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
