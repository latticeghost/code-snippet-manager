import Link from 'next/link'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-neutral-700 mt-24">
      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
        
        {/* Copyright notice */}
        <p className="text-gray-400 order-2 md:order-1">
          &copy; {currentYear} Code Snippet Manager. All rights reserved.
        </p>
        
        {/* Navigational Links */}
        <div className="space-x-4 order-1 md:order-2">
          {/* Link to the About Page (where the form is currently integrated) */}
          <Link 
            href="/about" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            About Us
          </Link>
          
          {/* Contact Link (pointing to the About page for now) */}
          <Link 
            href="/about#contact" // Use an anchor tag to jump directly to the form section (if possible)
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact Us
          </Link>

          {/* Policy Link */}
          <Link 
            href="/privacy-policy" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}