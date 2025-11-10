'use client'; // This must be a client component

import { deleteSnippet } from '../lib/actions';
import { useState } from 'react';

// 1. The component now accepts 'category' and 'slug'
export default function DeleteSnippetButton({ category, slug }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this snippet? This action cannot be undone.'
    );

    if (confirmed) {
      setIsDeleting(true);
      setError(null);
      
      // 2. Call the server action with BOTH category and slug
      const result = await deleteSnippet(category, slug);
      
      if (result?.error) {
        setError(result.error);
        setIsDeleting(false);
      }
      // On success, the action handles the redirect
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-500"
      >
        {isDeleting ? 'Deleting...' : 'Delete Snippet'}
      </button>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </>
  );
}