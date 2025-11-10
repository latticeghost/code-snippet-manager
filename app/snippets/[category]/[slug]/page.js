import Link from 'next/link';
import { getSnippetData } from '../../../../lib/snippets'; // Path is one level deeper
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]/route'; // Path is one level deeper
import DeleteSnippetButton from '../../../../components/DeleteSnippetButton'; // Path is one level deeper
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { formatSlug } from '../../../../lib/utils';

export async function generateMetadata({ params }) {
  const { category, slug } = params;

  if (!category || !slug) {
    return {
      title: 'Code Snippet',
      description: 'A code snippet page.',
    };
  }

  // Only call getSnippetData if both parameters are present and valid
  const snippet = await getSnippetData(category, slug);

  return {
    title: snippet.title || 'Snippet Not Found',
    description: snippet.description || `Code snippet for ${category} programming.`,
    alternates: {
      canonical: `/snippets/${category}/${slug}`,
    },
  };
}

export default async function SnippetPage({ params }) {
  const awaitedParams = await params;

  const { category, slug } = awaitedParams;

  const snippetDataPromise = getSnippetData(category, slug);
  const sessionPromise = getServerSession(authOptions);

  const [snippet, session] = await Promise.all([
    snippetDataPromise,
    sessionPromise,
  ]);

  // --- BREADCRUMB LOGIC ---
  // 1. Format the category slug (e.g., "c-programming" -> "C Programming")
  const prettyCategoryName = formatSlug(category);

  // 2. Define the breadcrumb links
  const crumbs = [
    { href: '/', name: 'Home' },
    // This links to your category page.
    // Assumes your category page is at /category/[category-slug]
    { href: `/category/${category}`, name: prettyCategoryName },
    { name: snippet.title }, // Current page (no link)
  ];
  // --- END BREADCRUMB LOGIC ---

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="w-full max-w-3xl">
        {/* --- REMOVED OLD LINK, REPLACED WITH BREADCRUMBS --- */}
        <Breadcrumbs crumbs={crumbs} />

        <h1 className="text-4xl font-bold mb-4">{snippet.title}</h1>
        <span className="inline-block bg-gray-800 text-blue-300 rounded-full px-3 py-1 text-sm font-medium mb-8">
          {snippet.language}
        </span>

        <article
          className="prose prose-invert lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: snippet.contentHtml }}
        />

        {session && (
          <div className="mt-8 flex gap-4">
            <Link
              href={`/admin/edit/${category}/${slug}`}
              className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Edit Snippet
            </Link>

            {/* This line is the important one to check */}
            <DeleteSnippetButton category={category} slug={slug} />
          </div>
        )}
      </div>
    </main>
  );
}