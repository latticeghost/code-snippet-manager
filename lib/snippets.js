import { remark } from 'remark';
import html from 'remark-html';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import connectToDB from './db';            // FIXED PATH
import Snippet from '../models/Snippet';   // FIXED PATH

// 1. Get all snippets sorted by title
export async function getSortedSnippetsData() {
  await connectToDB();
  
  const snippets = await Snippet.find({}).lean();

  return snippets.sort((a, b) => (a.title < b.title ? -1 : 1));
}

// 2. Get Single Snippet Data
export async function getSnippetData(category, slug) {
  await connectToDB();

  const snippet = await Snippet.findOne({ category, slug }).lean();

  if (!snippet) {
    throw new Error('Snippet not found');
  }

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(snippet.content);
    
  const contentHtml = processedContent.toString();

  return {
    ...snippet,
    _id: snippet._id.toString(),
    contentHtml,
  };
}

// 3. Get Raw Content
export async function getRawSnippetContent(category, slug) {
  await connectToDB();
  
  const snippet = await Snippet.findOne({ category, slug }).select('content').lean();
  
  if (!snippet) {
    throw new Error('Snippet not found.');
  }
  
  return snippet.content;
}

// 4. Get Categories
export async function getAllCategories() {
  await connectToDB();

  const results = await Snippet.aggregate([
    { 
      $group: { 
        _id: "$category", 
        count: { $sum: 1 } 
      } 
    },
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

  return snippets.sort((a, b) => (a.title < b.title ? -1 : 1));
}