'use server'; 

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
// Assuming slugify is correctly imported from './utils'
import { slugify } from './utils';

// Get the path to the _snippets directory
const snippetsDirectory = path.join(process.cwd(), '_snippets');

export async function createNewSnippet(formData) {
  // 1. Get all the form data and trim
  const title = (formData.get('title') || '').trim();
  const language = (formData.get('language') || '').trim();
  const category = (formData.get('category') || '').trim();
  const content = (formData.get('content') || '').trim();

  // 2. Simple validation
  if (!title || !language || !content || !category) {
    return { error: 'All fields are required.' };
  }
  
  try {
    // 3. Create a URL-friendly slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50);

    // 4. CRITICAL FIX: Strip any accidental Frontmatter from the user's input
    let cleanContent = content.trim();
    if (cleanContent.startsWith('---')) {
        // Find the end of the Frontmatter block (after the first '---')
        const endOfFrontmatter = cleanContent.indexOf('---', 3);
        if (endOfFrontmatter > -1) {
            cleanContent = cleanContent.substring(endOfFrontmatter + 3).trim();
        }
    }

    // 5. Calculate the description from the *clean* content
    const rawDescription = cleanContent.split(/[.!?]/)[0]; 
    
    // 6. Escape quotes for YAML safety and truncate
    let description = (rawDescription.length > 150 
        ? rawDescription.substring(0, 150) + '...'
        : rawDescription
    ).trim();

    // 🔑 FIX: Escape single quotes (replace ' with '') and replace newlines/tabs
    description = description.replace(/'/g, "''").replace(/[\n\t]/g, ' ');

    // 7. Security Check: Validate slug and category
    if (!slug || slug.includes('..') || slug.includes('/')) {
      return { error: 'Invalid title, results in a bad slug.' };
    }
    if (!category || category.includes('..') || category.includes('/')) {
      return { error: 'Invalid category name.' };
    }

    // 8. Define the path for the category folder and the file
    const categoryPath = path.join(snippetsDirectory, category);
    const filePath = path.join(categoryPath, `${slug}.md`);

    // 9. Create category folder if it doesn't exist
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    // 10. Construct the Markdown string using Array.join()
    const markdownLines = [
      '---',
      `title: '${title}'`,
      `language: '${language}'`,
      `description: '${description}'`, // SAFE DESCRIPTION NOW
      `category: '${category}'`,
      `slug: '${slug}'`,
      '---',
      '', // Ensures a clean newline after Frontmatter
      cleanContent // USE CLEAN CONTENT
    ];
    const finalFileContent = markdownLines.join('\n');

    // 11. Write the file content
    fs.writeFileSync(filePath, finalFileContent, 'utf8');

    // 12. Revalidate the cache
    revalidatePath('/');
    revalidatePath(`/category/${category}`);
    revalidatePath(`/snippets/${category}/${slug}`);

    // 13. Return a success message
    return { success: 'Snippet created successfully!' };
    
  } catch (e) {
    // Check if the error is due to directory or file creation failure
    if (e.code === 'ENOENT' || e.code === 'EACCES') {
        return { error: `File system error: Check permissions or path existence.` };
    }
    return { error: `An error occurred: ${e.message}` };
  }
}

// --- DELETE SNIPPET FUNCTION ---

export async function deleteSnippet(category, slug) {
  // 1. 🔒 Check if user is an admin
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: 'Unauthorized: You must be logged in.' };
  }

  // 2. 🔒 v2.0 Validate BOTH category and slug
  if (!slug || slug.includes('..') || slug.includes('/') ||
      !category || category.includes('..') || category.includes('/')) {
    return { error: 'Invalid path.' };
  }

  try {
    // 3. v2.0 Define the full file path (inside its category)
    const filePath = path.join(snippetsDirectory, category, `${slug}.md`);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file
    } else {
      return { error: 'File not found.' };
    }

    // 4. v2.0 Revalidate cache for homepage and the category page
    revalidatePath('/');
    revalidatePath(`/category/${category}`);
    revalidatePath(`/snippets/${category}/${slug}`); // Also the snippet page itself

  } catch (e) {
    return { error: `An error occurred: ${e.message}` };
  }

  // 5. v2.0 Redirect back to the homepage
  // (We could also redirect to `/category/${category}`)
  redirect('/');
}

export async function updateSnippet(category, slug, newContent) {
  // 1. 🔒 Check if user is an admin
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: 'Unauthorized: You must be logged in.' };
  }

  // 2. 🔒 v2.0 Validate all inputs
  if (!slug || slug.includes('..') || slug.includes('/') ||
      !category || category.includes('..') || category.includes('/') ) {
    return { error: 'Invalid path.' };
  }
  
  // 3. Simple content validation
  if (!newContent) {
    return { error: 'Content cannot be empty.' };
  }

  try {
    // 4. v2.0 Define the full file path
    const filePath = path.join(snippetsDirectory, category, `${slug}.md`);

    // 5. Check if the file exists before writing
    if (!fs.existsSync(filePath)) {
      return { error: 'File not found. Cannot update.' };
    }

    // 6. Write (overwrite) the file with new content
    fs.writeFileSync(filePath, newContent, 'utf8');

    // 7. v2.0 Revalidate all relevant paths
    revalidatePath('/');
    revalidatePath(`/category/${category}`);
    revalidatePath(`/snippets/${category}/${slug}`);
    
  } catch (e) {
    return { error: `An error occurred: ${e.message}` };
  }

  // 8. Redirect back to the snippet page after successful edit
  redirect(`/snippets/${category}/${slug}`);
}