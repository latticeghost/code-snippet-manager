'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Assuming formatSlug is available or you copy its logic here
const formatSlug = (s) => s.replace(/-/g, ' '); 

// This component receives the full list of snippets as a prop (no need to fetch it)
export default function SearchClient({ allSnippets }) {
  const searchParams = useSearchParams();
  
  // Get the query safely from the client-side URL
  const query = searchParams.get('q') || ''; 
  const lowerQuery = query.toLowerCase();

  const filteredSnippets = allSnippets.filter(snippet => {
    // We keep the safety checks
    const titleMatch = (snippet.title || '').toLowerCase().includes(lowerQuery);
    const descMatch = (snippet.description || '').toLowerCase().includes(lowerQuery);
    const langMatch = (snippet.language || '').toLowerCase().includes(lowerQuery);
    const catMatch = (snippet.category || '').toLowerCase().includes(lowerQuery);
    const contentMatch = (snippet.content || '').toLowerCase().includes(lowerQuery);
  
    return titleMatch || descMatch || langMatch || catMatch || contentMatch;
  });

  return (
    <section className="w-full max-w-5xl">
      <h1 className="text-4xl font-bold mb-8">
        Search Results for "{query}"
      </h1>
      
      <p className="text-lg text-neutral-400 mb-8">
        Found {filteredSnippets.length} matching snippets.
      </p>

      {/* --- Results Grid --- */}
      {filteredSnippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map(({ category, slug, title, language, description }) => (
            <Link
              href={`/snippets/${category}/${slug}`}
              key={`${category}-${slug}`}
              className="flex flex-col border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <div className="flex-grow">
                <span className="text-sm font-medium text-blue-400 mb-1 block">
                  {formatSlug(category)}
                </span>
                <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-400 mb-4">{description}</p>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="inline-block bg-gray-800 text-blue-300 rounded-full px-3 py-1 text-sm font-medium">
                  {language}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-xl">
          No snippets found.
        </p>
      )}
    </section>
  );
}