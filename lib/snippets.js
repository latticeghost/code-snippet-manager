import { remark } from 'remark';
import html from 'remark-html';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import connectToDB from './db';
import Snippet from '../models/Snippet';

// Helper to sanitize MongoDB data (converts _id and dates to strings)
function sanitize(data) {
  return JSON.parse(JSON.stringify(data));
}

// 1. Get all snippets sorted by title
export async function getSortedSnippetsData() {
  await connectToDB();
  const snippets = await Snippet.find({}).lean();
  // Sanitize to ensure no "Serializable" errors
  return sanitize(snippets).sort((a, b) => (a.title < b.title ? -1 : 1));
}

// 2. Get Single Snippet Data
export async function getSnippetData(category, slug) {
  await connectToDB();
  const snippet = await Snippet.findOne({ category, slug }).lean();

  if (!snippet) {
    return null; // Handle not found gracefully
  }

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(snippet.content);
    
  return {
    ...sanitize(snippet),
    contentHtml: processedContent.toString(),
  };
}

// 3. Get Raw Content
export async function getRawSnippetContent(category, slug) {
  await connectToDB();
  const snippet = await Snippet.findOne({ category, slug }).select('content').lean();
  return snippet ? snippet.content : null;
}

// 4. Get Categories
export async function getAllCategories() {
  await connectToDB();
  const results = await Snippet.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  return results.map(cat => ({
    name: cat._id,
    count: cat.count
  }));
}

// 5. Get Snippets by Category
export async function getSnippetsByCategory(category) {
  await connectToDB();
  const snippets = await Snippet.find({ category }).lean();
  return sanitize(snippets).sort((a, b) => (a.title < b.title ? -1 : 1));
}