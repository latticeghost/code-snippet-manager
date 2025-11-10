'use client';

import { useState } from 'react';
// 🔑 REMOVED: useActionState, useFormStatus imports
import { createNewSnippet } from '../lib/actions'; 

export default function NewSnippetForm() {
  // 1. Restore local state for inputs and submission status
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the default browser form submission
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      // 2. Manually construct the FormData object
      const formData = new FormData();
      formData.append('title', title);
      formData.append('language', language);
      formData.append('category', category);
      formData.append('content', content);

      // 3. Call the Server Action as a standard asynchronous function
      const result = await createNewSnippet(formData);

      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess(result.success);
        // Clear the form on success (as requested)
        setTitle('');
        setLanguage('');
        setCategory('');
        setContent('');
      }

    } catch (e) {
      setError('An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // 4. Revert to using the onSubmit handler
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Title Field - Now controlled by useState */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Snippet Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title} // Use local state
          onChange={(e) => setTitle(e.target.value)} // Use local state
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2"
          required
        />
      </div>

      {/* Language Field */}
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-300">Language</label>
        <input
          type="text"
          id="language"
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2"
          required
        />
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value.toLowerCase().trim())}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2"
          required
          placeholder="A single word, all lowercase"
        />
      </div>
      
      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300">Snippet Content (in Markdown)</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2 font-mono"
          required
          placeholder="Start with your code and a good description."
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting} // Use local state
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500"
        >
          {isSubmitting ? 'Creating...' : 'Create Snippet'}
        </button>
      </div>

      {/* --- Feedback Area --- */}
      <div className="mt-4">
        {success && (
          <p className="text-green-500 font-medium">
            Success: {success}
          </p>
        )}
        {error && (
          <p className="text-red-500 font-medium">
            Error: {error}
          </p>
        )}
      </div>
    </form>
  );
}