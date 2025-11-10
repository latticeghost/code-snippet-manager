import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

// Define the path to our snippets directory
const snippetsDirectory = path.join(process.cwd(), '_snippets');

/**
 * v2.0: Reads all subfolders (categories) and returns a list
 * of all snippets with their category.
 */
export function getSortedSnippetsData() {
  // 1. Get all category folder names
  const categoryFolders = fs.readdirSync(snippetsDirectory).filter(item => {
    const itemPath = path.join(snippetsDirectory, item);
    // Ensure we're only reading directories
    try {
      return fs.statSync(itemPath).isDirectory();
    } catch (e) {
      return false; // Ignore files like .DS_Store
    }
  });

  let allSnippetsData = [];

  // 2. Loop through each category folder
  for (const category of categoryFolders) {
    const categoryPath = path.join(snippetsDirectory, category);
    
    // 3. Read all .md files inside
    const fileNames = fs.readdirSync(categoryPath).filter(file => file.endsWith('.md'));

    for (const fileName of fileNames) {
      // 4. Remove ".md" from file name to get the slug
      const slug = fileName.replace(/\.md$/, '');

      // 5. Read the Markdown file as a string
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // 6. Use gray-matter to parse the frontmatter
      const matterResult = matter(fileContents);

      // 7. Combine the data with the slug AND the category
      allSnippetsData.push({
        slug,
        category, // Add the category
        content: matterResult.content,
        ...matterResult.data,
      });
    }
  }

  // 8. Sort snippets by title
  return allSnippetsData.sort((a, b) => (a.title < b.title ? -1 : 1));
}

/**
 * v2.0: Gets the data for a single snippet,
 * now requiring both category and slug.
 */
export async function getSnippetData(category, slug) {
  // 🔒 Security Checks
  if (!slug || !category || slug.includes('..') || category.includes('..')) {
    throw new Error('Invalid path provided.');
  }

  const fullPath = path.join(snippetsDirectory, category, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
const processedContent = await remark()
  .use(remarkRehype)         // Convert markdown to HTML AST
  .use(rehypeHighlight)      // Apply syntax highlighting
  .use(rehypeStringify)      // Convert HTML AST to string
  .process(matterResult.content);
const contentHtml = processedContent.toString();

return {
    slug,
    category,
    contentHtml,
    ...matterResult.data,
  };
}

export function getRawSnippetContent(category, slug) {
  // Security Checks
  if (!slug || !category || slug.includes('..') || category.includes('..')) {
    throw new Error('Invalid slug provided.');
  }

  const fullPath = path.join(snippetsDirectory, category, `${slug}.md`);
  
  if (fs.existsSync(fullPath)) {
    // Read the file and return its raw string content
    return fs.readFileSync(fullPath, 'utf8');
  } else {
    throw new Error('Snippet not found.');
  }
}

// Gets all categories and a count of snippets in each
export function getAllCategories() {
  const categoryFolders = fs.readdirSync(snippetsDirectory).filter(item => {
    const itemPath = path.join(snippetsDirectory, item);
    try {
      return fs.statSync(itemPath).isDirectory();
    } catch (e) {
      return false;
    }
  });

  const categories = categoryFolders.map(category => {
    const categoryPath = path.join(snippetsDirectory, category);
    const fileNames = fs.readdirSync(categoryPath).filter(file => file.endsWith('.md'));
    
    return {
      name: category,
      count: fileNames.length, // Get the number of snippets
    };
  });

  // Return categories with at least one snippet
  return categories.filter(cat => cat.count > 0);
}

// Gets all snippets for ONE specific category
export function getSnippetsByCategory(category) {
  // 🔒 Security Check
  if (!category || category.includes('..') || category.includes('/')) {
    throw new Error('Invalid category provided.');
  }

  const allSnippetsData = [];
  const categoryPath = path.join(snippetsDirectory, category);

  // Check if the category folder exists
  if (!fs.existsSync(categoryPath)) {
    return []; // Return an empty array if category doesn't exist
  }

  const fileNames = fs.readdirSync(categoryPath).filter(file => file.endsWith('.md'));

  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(categoryPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    allSnippetsData.push({
      slug,
      category,
      ...matterResult.data,
    });
  }

  // Sort snippets by title
  return allSnippetsData.sort((a, b) => (a.title < b.title ? -1 : 1));
}