import Link from 'next/link';
import { getSnippetsByCategory } from '../../../lib/snippets';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { formatSlug } from '../../../lib/utils';

export default async function CategoryPage({ params }) {
  
  // 1. We MUST await 'params' itself, as it's a promise.
  const awaitedParams = await params;
  const category = awaitedParams.category;

  // 2. Get all snippets for THIS category
  const snippets = await getSnippetsByCategory(category);

  // --- BREADCRUMB LOGIC ---
  // 1. Format the category slug (e.g., "c-programming" -> "C Programming")
  const prettyCategoryName = formatSlug(category);

  // 2. Define the breadcrumb links
  const crumbs = [
    { href: '/', name: 'Home' },
    { name: prettyCategoryName }, // Current page (no link)
  ];
  // --- END BREADCRUMB LOGIC ---

  return (
    <main className="flex min-h-screen flex-col items-center">
      
      {/* ===== Category Header Section ===== */}
      <section className="w-full flex justify-center bg-neutral-800 border-b border-neutral-700 p-16 text-center">
        <div className="max-w-3xl">
          {/* --- REMOVED "BACK" LINK --- */}
          <h1 className="text-5xl font-extrabold">
            {/* --- USE PRETTY NAME --- */}
            {prettyCategoryName}
          </h1>
          <p className="text-xl text-gray-300 mt-2">
            {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} found.
          </p>
        </div>
      </section>

      {/* ===== Snippets Grid Section ===== */}
      <section className="w-full max-w-5xl p-8 md:p-12">
        
        {/* --- ADD BREADCRUMBS HERE --- */}
        <Breadcrumbs crumbs={crumbs} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          
          {/* Map over the data and create a card for each snippet */}
          {snippets.map(({ slug, title, language, description }) => (
            <Link
              href={`/snippets/${category.toLowerCase()}/${slug}`}
              key={slug}
              className="flex flex-col border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-400 mb-4 flex-grow">{description}</p>
              
              <div className="flex justify-between items-center">
                <span className="inline-block bg-gray-800 text-blue-300 rounded-full px-3 py-1 text-sm font-medium">
                  {language}
                </span>
              </div>
            </Link>
          ))}

        </div>
      </section>

    </main>
  );
}