import fs from 'fs';
import { extractTextFromPDF, convertToFlashcards } from './openaiService.js';
import Document from './documentModel.js';

export const uploadAndConvert = async (req, res) => {
  try {
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('📥 File uploaded:', req.file.originalname);

    const filePath = req.file.path;
    const text = await extractTextFromPDF(filePath);

    if (!text || text.trim().length === 0) {
      console.log('🚫 No text extracted from PDF.');
      return res.status(400).json({ error: 'No text found in PDF' });
    }

    console.log('📄 Extracted text preview:', text.slice(0, 300));

    const flashcards = await convertToFlashcards(text);

    if (!Array.isArray(flashcards) || flashcards.length === 0) {
      console.log('🚫 No flashcards returned from OpenAI.');
      console.log('🧠 Raw OpenAI output:', flashcards);
      return res.status(400).json({ error: 'No flashcards generated' });
    }

    console.log('✅ Flashcards to save:', flashcards.slice(0, 1));

    fs.unlinkSync(filePath);

    const savedDoc = await Document.create({
      filename: req.file.originalname,
      flashcards,
    });

    console.log('✅ Flashcards saved to DB with ID:', savedDoc._id);

    res.status(200).json({ message: 'Flashcards saved to DB', flashcards });
  } catch (error) {
    console.error('❌ Error in uploadAndConvert:', error);
    res.status(500).json({
      error: 'Failed to process PDF',
      details: error.message || String(error),
    });
  }
};
