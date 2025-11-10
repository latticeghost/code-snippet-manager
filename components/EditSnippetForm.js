'use client';

import { useState } from 'react';
import { updateSnippet } from '../lib/actions'; 

// 1. Accept 'category', 'slug', and 'initialContent'
export default function EditSnippetForm({ category, slug, initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // 2. Call the update action with all three arguments
      const result = await updateSnippet(category, slug, content);

      if (result?.error) {
        setError(result.error);
        setIsSubmitting(false);
      }
      // On success, the action handles the redirect

    } catch (e) {
      setError('An unexpected error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300">
          Snippet Content (in Markdown)
        </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="20"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2 font-mono"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-500"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
}