export default function ContactForm() {
  const formActionUrl = "https://formspree.io/f/xpwkanok";

  return (
    <div className="mt-10 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Send Us a Message</h2>
      
      {/* The 'action' attribute points to your Formspree endpoint */}
      <form action={formActionUrl} method="POST" className="space-y-4">
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="example@email.com"
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Message or Suggestion
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            placeholder="I love the project! Could you add..."
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}