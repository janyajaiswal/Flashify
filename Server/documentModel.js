import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  filename: String,
  flashcards: [
    {
      question: String,
      answer: String,
    }
  ],
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema, 'Documents');
export default Document;
