'use client'; 

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import UniversalSearch from './UniversalSearch'; 

export default function Header() {
  const { data: session } = useSession(); // 3. Get the user's session status

  return (
    <header className="bg-neutral-900 border-b border-neutral-700 w-full sticky top-0 z-10">
      <nav className="max-w-5xl mx-auto flex justify-between items-center p-6">
        
        {/* Logo / Site Title */}
        <Link 
          href="/" 
          className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
        >
          Code Snippet Manager
        </Link>
        
        {/* Navigation & Auth Links */}
        <div className="flex items-center space-x-6">
          
          <UniversalSearch />
          
          {session ? ( // 4. Check if a 'session' exists
            <>
              {/* If logged in, show 'Add Snippet' and 'Logout' */}
              <Link 
                href="/admin/new" 
                className="text-white font-medium hover:text-blue-400 transition-colors"
              >
                Add Snippet
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* If logged out, show 'Login' */}
              <button 
                onClick={() => signIn()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}