'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/api/auth/[...nextauth]/route'; // Adjust path if your auth route is elsewhere
import { redirect } from 'next/navigation';
import connectToDB from './db';
import Snippet from '../models/Snippet';

// --- CREATE ---
export async function createNewSnippet(formData) {
  // 1. Get and trim data
  const title = (formData.get('title') || '').trim();
  const language = (formData.get('language') || '').trim();
  const category = (formData.get('category') || '').trim();
  const content = (formData.get('content') || '').trim();

  // 2. Validate
  if (!title || !language || !content || !category) {
    return { error: 'All fields are required.' };
  }

  try {
    await connectToDB();

    // 3. Create Slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50);

    // 4. Clean Content (remove accidental frontmatter if pasted)
    let cleanContent = content;
    if (cleanContent.startsWith('---')) {
        const endOfFrontmatter = cleanContent.indexOf('---', 3);
        if (endOfFrontmatter > -1) {
            cleanContent = cleanContent.substring(endOfFrontmatter + 3).trim();
        }
    }

    // 5. Generate Description
    const rawDescription = cleanContent.split(/[.!?]/)[0]; 
    const description = (rawDescription.length > 150 
        ? rawDescription.substring(0, 150) + '...'
        : rawDescription
    ).trim().replace(/[\n\t]/g, ' ');

    // 6. Check for duplicates
    const existing = await Snippet.findOne({ category, slug });
    if (existing) {
      return { error: 'A snippet with this title already exists in this category.' };
    }

    // 7. Save to MongoDB
    await Snippet.create({
      title,
      slug,
      category,
      language,
      description,
      content: cleanContent
    });

    // 8. Revalidate Cache
    revalidatePath('/');
    revalidatePath(`/category/${category}`);

    return { success: 'Snippet created successfully!' };
    
  } catch (e) {
    return { error: `Database Error: ${e.message}` };
  }
}

// --- DELETE ---
export async function deleteSnippet(category, slug) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: 'Unauthorized: You must be logged in.' };
  }

  try {
    await connectToDB();
    const result = await Snippet.findOneAndDelete({ category, slug });
    
    if (!result) return { error: 'Snippet not found.' };

    revalidatePath('/');
    revalidatePath(`/category/${category}`);
  } catch (e) {
    return { error: `Database Error: ${e.message}` };
  }

  redirect('/');
}

// --- UPDATE ---
export async function updateSnippet(category, slug, newContent) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: 'Unauthorized: You must be logged in.' };
  }

  if (!newContent) return { error: 'Content cannot be empty.' };

  try {
    await connectToDB();
    const result = await Snippet.findOneAndUpdate(
      { category, slug },
      { content: newContent },
      { new: true }
    );

    if (!result) return { error: 'Snippet not found.' };

    revalidatePath('/');
    revalidatePath(`/category/${category}`);
    revalidatePath(`/snippets/${category}/${slug}`);
  } catch (e) {
    return { error: `Database Error: ${e.message}` };
  }

  redirect(`/snippets/${category}/${slug}`);
}