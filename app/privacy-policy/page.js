import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="flex justify-center p-8 md:p-16">
      <div className="w-full max-w-3xl">
        <article className="prose prose-invert lg:prose-xl">
          
          <h1>🔐 Privacy Policy</h1>
          <p>
            The <strong>Code Snippet Manager</strong> is a personal, non-commercial, open-source portfolio project. Our approach to data collection is minimal.
          </p>
          
          ---
          
          <h2>Data & Analytics (G-Tag)</h2>
          <p>
            We use a basic <strong>Google Tag (G-tag)</strong> to understand how visitors use the site (e.g., which pages are most popular and what general regions visitors come from).
          </p>
          <ul>
            <li>
              <strong>What we track:</strong> We collect non-personal, aggregated usage data, such as page views and browser type.
            </li>
            <li>
              <strong>What we don't track:</strong> We do not track personal identifying information (PII) and have implemented IP address anonymization where possible.
            </li>
            <li>
              <strong>Opt-Out:</strong> You can generally disable cookies in your browser settings to prevent this data collection, though this may affect site functionality.
            </li>
          </ul>
          
          <h2>1. User Accounts (Future)</h2>
          <p>
            If user authentication is implemented in the future, it will be solely for managing the site's content (admin dashboard) and will not be available for public sign-up. No public user accounts or associated data will be collected.
          </p>
          
          <h2>2. Contact & Feedback</h2>
          {/* Updated to reflect the new Formspree setup */}
          <p>
            If you have questions or wish to provide feedback, you can use the contact form provided on the <Link href="/about">About page</Link>. Information submitted through this form (name, email, message) is used only to respond to your inquiry and is handled by <strong>Formspree.io</strong>. We do not store this correspondence data locally.
          </p>
        </article>
      </div>
    </main>
  );
}