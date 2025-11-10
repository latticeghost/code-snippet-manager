import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../api/auth/[...nextauth]/route'; // Path is one level deeper
import { redirect } from 'next/navigation';
import { getRawSnippetContent } from '../../../../../lib/snippets'; // Path is one level deeper
import EditSnippetForm from '../../../../../components/EditSnippetForm'; // Path is one level deeper

export default async function EditSnippetPage({ params }) {
  // 1. 🔒 Protect the route
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  // 2. v2.0 Get both category and slug
  const awaitedParams = await params;
  const { category, slug } = awaitedParams;
  
  // 3. Get the raw content
  const content = getRawSnippetContent(category, slug);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-16">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Edit Snippet
        </h1>
        {/* 4. Pass category, slug, and content to the form */}
        <EditSnippetForm 
          category={category} 
          slug={slug} 
          initialContent={content} 
        />
      </div>
    </main>
  );
}