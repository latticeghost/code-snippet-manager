'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs'; // Assuming it's in /components
import { formatSlug } from '../lib/utils'; // Assuming it's in /lib

export default function SnippetList({ snippets, category }) {
  // 1. Format the category name for display
  const prettyCategoryName = formatSlug(category);

  // 2. Define the breadcrumb links
  const crumbs = [
    { href: '/', name: 'Home' },
    { name: prettyCategoryName }, // Current page (no link)
  ];

  // 3. NOTE: We are no longer filtering here, just displaying all snippets.
  // The universal search will handle all searching.

  return (
    <>
      {/* --- BREADCRUMBS --- */}
      <Breadcrumbs crumbs={crumbs} />

      {/* --- SEARCH BAR --- */}
      {/* --- I have removed the category-specific search bar from here --- */}

      {/* --- SNIPPETS GRID --- */}
      {snippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {snippets.map(({ slug, title, language, description }) => (
            <Link
              href={`/snippets/${category}/${slug}`}
              key={slug}
              className="flex flex-col border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-400 mb-4 flex-grow">{description}</p>
              
              <div className="flex justify-between items-center">
                <span className="inline-block bg-gray-800 text-blue-300 rounded-full px-3 py-1 text-sm font-medium">
                  {language}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">
          No snippets found in this category.
        </p>
      )}
    </>
  );
}