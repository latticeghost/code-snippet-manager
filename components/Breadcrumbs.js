// components/Breadcrumbs.js
import Link from 'next/link';

export default function Breadcrumbs({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center space-x-2 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={index} className="flex items-center text-gray-400">
              {/* Add the separator (slash) before each item except the first */}
              {index > 0 && <span className="mx-2">/</span>}
              
              {/* If it's the last item, just display text */}
              {isLast ? (
                <span className="font-medium text-gray-200">{crumb.name}</span>
              ) : (
                // Otherwise, render a link
                <Link href={crumb.href} className="text-blue-400 hover:text-blue-300">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}