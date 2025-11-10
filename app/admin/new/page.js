import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import NewSnippetForm from '../../../components/NewSnippetForm';

export default async function NewSnippetPage() {
  // 1. Get the user's session from the server
  const session = await getServerSession(authOptions);

  // 2. If the user is NOT logged in, redirect them to the login page
  if (!session) {
    redirect('/login');
  }

  // 3. If they are logged in, show the "New Snippet" form
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-16">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Add a New Snippet
        </h1>
        <NewSnippetForm />
      </div>
    </main>
  );
}