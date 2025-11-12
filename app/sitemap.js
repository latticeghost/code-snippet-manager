// app/sitemap.js

import { getSortedSnippetsData, getAllCategories } from '@/lib/snippets';

// WARNING: Replace this with your live website's URL when deploying!
const BASE_URL = 'http://localhost:3000'; 

export default async function sitemap() {
  const allSnippets = await getSortedSnippetsData();
  const allCategories = await getAllCategories(); // Use the dedicated function for categories

  // 1. Dynamic Snippet Paths (/snippets/[category]/[slug])
  const snippetEntries = allSnippets.map((snippet) => ({
    // URL: /snippets/go/goroutines-and-channels
    url: `${BASE_URL}/snippets/${snippet.category}/${snippet.slug}`,
    
    // Use 'updatedAt' or 'date' from the frontmatter, otherwise use a default
    lastModified: snippet.updatedAt // Assuming 'updatedAt' is in the frontmatter
      ? new Date(snippet.updatedAt).toISOString()
      : new Date().toISOString(), 

    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 2. Dynamic Category Paths (/category/[category])
  const categoryEntries = allCategories.map((cat) => ({
    // URL: /category/go
    url: `${BASE_URL}/category/${cat.name}`,
    
    // We don't have a specific date for the category, so use current date
    lastModified: new Date().toISOString(), 
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // 3. Combine Static and Dynamic Entries
  return [
    // Static Homepage
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    
    // Dynamic Category Pages
    ...categoryEntries, 

    // Dynamic Individual Snippet Pages
    ...snippetEntries, 
  ];
}