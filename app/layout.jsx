import './globals.css';
import Sidebar from './components/Sidebar';
import FloatingAI from './components/FloatingAI';

export const metadata = {
  title: 'Traveloop — Discover the Best Place',
  description: 'Plan your next adventure with precision and style.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Sidebar />
        {children}
        <FloatingAI />
      </body>
    </html>
  );
}
