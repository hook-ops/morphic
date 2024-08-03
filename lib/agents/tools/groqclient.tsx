// lib/agents/tools/groqClient.ts
import axios from 'axios';

const groqClient = axios.create({
  baseURL: 'https://api.groq.com', // Update with actual Groq API URL
  headers: {
    'Authorization': `Bearer YOUR_API_KEY`, // Replace with your actual API key
  },
});

export const getGroqResponse = async (prompt: string) => {
  const response = await groqClient.post('/endpoint', { prompt }); // Update '/endpoint' with the actual API endpoint
  return response.data;
};
