import 'highlight.js/styles/atom-one-dark.css';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthProvider from '../components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Code Snippet Manager',
  description: 'Your personal collection of code snippets',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <Header />
          
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}