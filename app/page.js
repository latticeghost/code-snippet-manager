import Link from 'next/link';
import { getSortedSnippetsData, getAllCategories } from '../lib/snippets';

// 1. Mark the component as 'async'
export default async function Home() {
  
  // 2. Use 'await' to resolve the Promises
  const allSnippets = await getSortedSnippetsData();
  const categories = await getAllCategories();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Your Personal <span className="text-blue-500">Code Library</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Organize, search, and access your favorite code snippets in seconds. 
          Built for developers, by developers.
        </p>
        <div className="flex justify-center gap-4 pt-4">
            <Link 
              href="/admin/new" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              + Create Snippet
            </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
          Browse by Category
        </h2>
        
        {/* Check if we have categories */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                href={`/category/${cat.name}`}
                className="bg-neutral-800 p-4 rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700 group"
              >
                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-blue-400 capitalize">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {cat.count} {cat.count === 1 ? 'snippet' : 'snippets'}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No categories found. Create a snippet to get started!</p>
        )}
      </section>

      {/* Recent Snippets List */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
          All Snippets
        </h2>
        <div className="grid gap-4">
          {allSnippets.map((snippet) => (
            <Link 
              key={snippet._id} 
              href={`/snippets/${snippet.category}/${snippet.slug}`}
              className="block bg-neutral-900 border border-neutral-800 p-5 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    {snippet.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {snippet.description}
                  </p>
                </div>
                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded uppercase">
                  {snippet.language}
                </span>
              </div>
            </Link>
          ))}

          {allSnippets.length === 0 && (
             <p className="text-gray-500 text-center py-8">No snippets found.</p>
          )}
        </div>
      </section>
    </div>
  );
}