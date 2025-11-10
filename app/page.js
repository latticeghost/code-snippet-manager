import Link from 'next/link';
import { getAllCategories } from '../lib/snippets'; // <-- 1. Import our new function

/**
 * A helper function to capitalize the first letter of a string.
 * @param {string} s - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function Home() {
  // 2. Get the list of categories and their counts
  const allCategories = getAllCategories();

  return (
    <main className="flex min-h-screen flex-col items-center">
      
      {/* ===== Hero Section (Updated) ===== */}
      <section className="w-full flex justify-center bg-neutral-800 border-b border-neutral-700 p-16 text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-4">
            Your Personal Code Library
          </h1>
          <p className="text-xl text-gray-300">
            Browse snippets by category. Fast, searchable, and always available.
          </p>
        </div>
      </section>

      {/* ===== 3. NEW Category Grid Section ===== */}
      <section className="w-full max-w-5xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          All Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Map over the categories and create a card for each */}
          {allCategories.map(({ name, count }) => (
            <Link
              href={`/category/${name}`} // <-- Links to our new page
              key={name}
              className="flex flex-col justify-between border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <div>
                <h2 className="text-3xl font-semibold mb-2">
                  {capitalize(name)}
                </h2>
              </div>
              <p className="text-gray-400">
                {count} snippet{count !== 1 ? 's' : ''}
              </p>
            </Link>
          ))}

        </div>
      </section>

    </main>
  );
}