// Styles 
import "./globals.css";

// Fonts
import { Source_Sans_3 } from 'next/font/google';

// Global font
const sourceSansPro = Source_Sans_3({
  weight: ['400', '600'],
  subsets: ['latin'],
  fallback: ['system-ui', 'arial'],
  display: 'swap',
});

export const metadata = {
  title: "Buspack process",
  description: "Web para correr scripts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sourceSansPro.className}>{children}</body>
    </html>
  );
}


