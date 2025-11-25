import mongoose from 'mongoose';

const SnippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this snippet.'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category.'],
  },
  language: {
    type: String,
    required: [true, 'Please specify the code language.'],
  },
  description: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: [true, 'Please provide the snippet content.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent compiling the model multiple times during development
export default mongoose.models.Snippet || mongoose.model('Snippet', SnippetSchema);