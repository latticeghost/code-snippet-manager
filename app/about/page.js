import ContactForm from '../../components/ContactForm';

export default function AboutPage() {
  return (
    <main className="flex justify-center p-8 md:p-16">
      <div className="w-full max-w-3xl">
        <article className="prose prose-invert lg:prose-xl">
          
          <h1>💡 About the Code Snippet Manager</h1>
          
          <p>
            Welcome! This project is a <strong>fast-access personal library</strong> for code snippets. We built it to solve the frustrating problem of constantly searching old chats, documentation, or past projects for those simple, repetitive code blocks you need every day.
          </p>
          
          <p>
            The goal is simple: provide a lightweight, organized, and <strong>blazing-fast</strong> place to store and retrieve your most useful code, allowing you to focus on building, not searching.
          </p>
          
          ---
          
          <h2>🛠 Our Modern Tech Stack</h2>
          <p>We chose these tools for performance, manageability, and a stellar developer experience:</p>
          
          <ul>
            <li>
              <strong>Next.js (App Router):</strong> Utilized for server-side rendering and the power of Server Components, ensuring an incredibly fast initial page load and efficient static content serving.
            </li>
            <li>
              <strong>React:</strong> The foundation for building a dynamic, modern, and highly responsive user interface.
            </li>
            <li>
              <strong>Tailwind CSS:</strong> For all styling and layout, enabling rapid, utility-first development and resulting in a minimal, optimized CSS bundle in production.
            </li>
            <li>
              <strong>Markdown Content (`remark` & `gray-matter`):</strong> All snippets and content are stored as flat <code>.md</code> files. This makes the content portable, version-controllable (via Git), and removes the dependency on a traditional database for content storage.
            </li>
            <li>
              <strong>NextAuth.js:</strong> Powers the security and authentication for the private administrative dashboard.
            </li>
          </ul>
        </article>

        <div 
          id="contact"
          className="mt-12 pt-8 border-t border-gray-700"
        >
            <ContactForm />
        </div>
        
      </div>
    </main>
  );
}