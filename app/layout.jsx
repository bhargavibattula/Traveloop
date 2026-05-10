import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Traveloop - Personalized Travel Planning Made Easy',
  description: 'Dream, design, and organize your multi-city trips with ease.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar glass">
          <div className="container nav-container">
            <Link href="/" className="nav-logo">
              Traveloop
            </Link>
            <div className="nav-links">
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/trips" className="nav-link">My Trips</Link>
              <Link href="/login" className="btn btn-primary">Sign In</Link>
            </div>
          </div>
        </nav>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
