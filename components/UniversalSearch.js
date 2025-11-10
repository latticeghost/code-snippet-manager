// NO 'use client'
// NO imports

export default function UniversalSearch() {
  return (
    // 1. Use a standard HTML form.
    // 'action' tells the browser where to send the data.
    // 'method="GET"' tells the browser to put the data in the URL.
    <form action="/search" method="GET" className="w-full max-w-xs">
      <label htmlFor="universal-search" className="sr-only">
        Search all snippets
      </label>
      <input
        type="search"
        id="universal-search"
        // 2. This 'name' attribute is the only thing that matters.
        // It tells the browser to create a URL parameter: ?q=...
        name="q"
        placeholder="Search all snippets..."
        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        // 3. We have removed ALL JavaScript (no onSubmit, onChange, or value)
      />
    </form>
  );
}