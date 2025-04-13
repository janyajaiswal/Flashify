import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import PDFParser from 'pdf2json';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const extractTextFromPDF = async (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataError', errData => {
      console.error('❌ PDF parsing error:', errData.parserError);
      reject(new Error('Could not parse PDF.'));
    });

    pdfParser.on('pdfParser_dataReady', pdfData => {
      try {
        const texts = [];
        pdfData.formImage?.Pages?.forEach(page => {
          page.Texts.forEach(textObj => {
            textObj.R.forEach(run => {
              texts.push(decodeURIComponent(run.T));
            });
          });
        });

        const finalText = texts.join(' ').trim();
        console.log('📄 Extracted Text Preview:', finalText.slice(0, 500));

        if (!finalText) {
          reject(new Error('No text found in the PDF.'));
        } else {
          resolve(finalText);
        }

      } catch (e) {
        reject(new Error('Error while parsing PDF structure: ' + e.message));
      }
    });

    try {
      pdfParser.loadPDF(filePath);
    } catch (e) {
      reject(new Error('Failed to load PDF file: ' + e.message));
    }
  });
};

export const convertToFlashcards = async (text) => {
  const prompt = `Convert the following academic content into a JSON array of flashcards. Each flashcard must contain "question" and "answer" fields only:\n\n${text}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.choices[0].message.content;
    console.log('🧠 OpenAI raw output:', content.slice(0, 300));

    const flashcards = JSON.parse(content);
    console.log('✅ Flashcards parsed:', flashcards.length);
    return flashcards;

  } catch (err) {
    console.error('❌ convertToFlashcards error:', err.message);
    throw new Error('Failed to convert text to flashcards');
  }
};
