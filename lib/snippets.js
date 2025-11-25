import { remark } from 'remark';
import html from 'remark-html';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import connectToDB from './lib/db';
import Snippet from './models/Snippet';

// 1. Get all snippets sorted by title
export async function getSortedSnippetsData() {
  await connectToDB();
  
  // .lean() converts Mongoose documents to plain JS objects (faster)
  const snippets = await Snippet.find({}).lean();

  return snippets.sort((a, b) => (a.title < b.title ? -1 : 1));
}

// 2. Get Single Snippet Data (Metadata + HTML Content)
export async function getSnippetData(category, slug) {
  await connectToDB();

  const snippet = await Snippet.findOne({ category, slug }).lean();

  if (!snippet) {
    throw new Error('Snippet not found');
  }

  // Convert Markdown Content to HTML
  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(snippet.content);
    
  const contentHtml = processedContent.toString();

  // Return everything combined, converting _id to string if needed
  return {
    ...snippet,
    _id: snippet._id.toString(),
    contentHtml,
  };
}

// 3. Get Raw Content (For the Edit Form)
export async function getRawSnippetContent(category, slug) {
  await connectToDB();
  
  const snippet = await Snippet.findOne({ category, slug }).select('content').lean();
  
  if (!snippet) {
    throw new Error('Snippet not found.');
  }
  
  return snippet.content;
}

// 4. Get Categories with Counts
export async function getAllCategories() {
  await connectToDB();

  // Use MongoDB Aggregation to group by category and count
  const results = await Snippet.aggregate([
    { 
      $group: { 
        _id: "$category", 
        count: { $sum: 1 } 
      } 
    },
    { $sort: { _id: 1 } } // Sort categories alphabetically
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

  return snippets.sort((a, b) => (a.title < b.title ? -1 : 1));
}