import { getSortedSnippetsData } from '../../lib/snippets';
import SearchClient from './SearchClient'; // Import the new client component

// We still use force-dynamic just in case, though it may not be necessary anymore.
export const dynamic = 'force-dynamic';

// The searchParams prop is now completely ignored by this file!
export default async function SearchPage() {
  
  // 1. Fetch ALL data on the server (once and fast)
  const allSnippets = getSortedSnippetsData(); 

  // 2. Render the client component, passing the data as a prop
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12">
      {/* SearchClient handles reading the URL and filtering the data */}
      <SearchClient allSnippets={allSnippets} />
    </main>
  );
}