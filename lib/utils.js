// lib/utils.js

/**
 * Converts a string into a URL-friendly slug (e.g., "My Cool Snippet!" -> "my-cool-snippet").
 * @param {string} text - The input string, typically the snippet title.
 * @returns {string} The slugified string.
 */
export function slugify(text) {
  if (!text) return '';
  
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing white space
    .replace(/[^\w\s-]/g, '') // Remove all non-word chars (punctuation, symbols)
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with a single dash
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
    .substring(0, 30);       // 🔑 CRITICAL FIX: TRUNCATE to a max of 50 chars
}

/**
 * Formats a URL slug into a human-readable title.
 * e.g., "next-js" -> "Next Js"
 */
export function formatSlug(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}