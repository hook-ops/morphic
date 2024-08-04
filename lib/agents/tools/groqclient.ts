// lib/agents/tools/groqClient.ts
import axios from 'axios';

// Initialize Axios client for Groq API
const groqClient = axios.create({
  baseURL: 'https://api.groq.com', // Update with the actual Groq API URL
  headers: {
    'Authorization': `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`, // Replace with your actual API key
  },
});

// Function to get a response from the Groq API
export const getGroqResponse = async (prompt: string) => {
  try {
    const response = await groqClient.post('/endpoint', { prompt }); // Update '/endpoint' with the actual API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching response from Groq API:', error);
    throw error;
  }
};
