import './globals.css';

export const metadata = {
  title: 'Traveloop — Discover the Best Place',
  description: 'Plan your next adventure with precision and style.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
