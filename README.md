# 💻 Code Snippet Manager

## Project Description

The **Code Snippet Manager** is a personal, fast-access library designed to solve the common developer problem of constantly searching documentation, old projects, or chat logs for repetitive, everyday code blocks. It provides a clean, organized, and blazing-fast interface for storing, managing, and retrieving your most essential code snippets.

This project serves as a showcase of a modern, lightweight web application architecture, prioritizing speed and ease of maintenance.

## ✨ Key Features

* **Fast Content Retrieval:** Leverage Next.js Server Components for lightning-fast initial load times and efficient content delivery.
* **Markdown-Powered Content:** All snippets are stored as simple Markdown (`.md`) files, making the content portable, version-controllable via Git, and easy to manage without relying on a traditional database.
* **Intuitive Interface:** Clean, dark-mode design built with Tailwind CSS for a focused user experience.
* **Easy Copying:** Dedicated "Copy to Clipboard" functionality for immediate use of snippets.
* **Secure Administration:** Utilizes NextAuth.js for secure, standard-based authentication to manage content.

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js (App Router)** | Primary framework for routing, rendering, and server components. |
| **React** | Foundation for the modern and responsive user interface. |
| **Tailwind CSS** | Utility-first CSS framework for rapid and maintainable styling. |
| **Markdown / `gray-matter`** | Content source—enables Git-controlled, file-based data management. |
| **NextAuth.js** | Provides secure authentication for the admin dashboard. |
| **Vercel** | Deployment platform, providing robust hosting and continuous integration. |

## 🚀 Getting Started (Local Development)

### Prerequisites

You will need **Node.js** (version 18+) installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL_HERE]
    cd code-snippet-manager
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env.local` in the root directory and add any necessary keys (e.g., `NEXTAUTH_SECRET` if using authentication).

    ```
    # Example (required for NextAuth)
    NEXTAUTH_SECRET="your_strong_secret_key_here"
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contribution

This is a personal portfolio project, but feel free to fork the repository to adapt it for your own use or suggest improvements!

## License

[MIT OR UNLICENSED - Choose one]

---

## ☁️ Next Step: Initial Git Commit and Push

Now that you have your refined files and a professional `README.md`, you are ready for the first push!

Follow these commands in your project's root directory:

1.  **Initialize the Git Repository (if not already done):**
    ```bash
    git init
    ```
2.  **Stage all new and modified files:**
    ```bash
    git add .
    ```
3.  **Create your first commit:**
    ```bash
    git commit -m "feat: Initial project setup with About, Privacy Policy, and Contact Form integration."
    ```
4.  **Link to your remote repository:**
    ```bash
    git remote add origin [YOUR_REMOTE_GIT_URL]
    ```
    (Replace `[YOUR_REMOTE_GIT_URL]` with the URL provided by GitHub/GitLab/Bitbucket.)
5.  **Push the project to the remote:**
    ```bash
    git push -u origin main
    ```
    (Use `master` instead of `main` if that is your repository's default branch name.)
