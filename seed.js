// seed.js
require('dotenv').config({ path: '.env.local' }); // Load your DB connection string
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const matter = require('gray-matter');

// Define the Snippet Schema inline for the script
const SnippetSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  category: String,
  language: String,
  description: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Snippet = mongoose.models.Snippet || mongoose.model('Snippet', SnippetSchema);

const snippetsDirectory = path.join(process.cwd(), '_snippets');

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing from .env.local');
    process.exit(1);
  }

  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected.');

  // 1. Get all category folders
  const categories = fs.readdirSync(snippetsDirectory).filter(file => {
    return fs.statSync(path.join(snippetsDirectory, file)).isDirectory();
  });

  for (const category of categories) {
    const categoryPath = path.join(snippetsDirectory, category);
    const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.md'));

    for (const file of files) {
      const slug = file.replace('.md', '');
      const filePath = path.join(categoryPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Parse Frontmatter
      const { data, content } = matter(fileContent);

      // Check if it already exists
      const exists = await Snippet.findOne({ slug, category });
      
      if (!exists) {
        await Snippet.create({
          title: data.title,
          slug: slug,
          category: category,
          language: data.language || 'text',
          description: data.description || '',
          content: content.trim(), // The markdown body
        });
        console.log(`✨ Imported: ${slug}`);
      } else {
        console.log(`⏭️  Skipped (Exists): ${slug}`);
      }
    }
  }

  console.log('🎉 Seeding complete!');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});