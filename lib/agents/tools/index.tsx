import { createStreamableUI } from 'ai/rsc';
import { retrieveTool } from './retrieve';
import { searchTool } from './search';
import { videoSearchTool } from './video-search';
import { getGroqResponse } from '../tools/groqclient';  // Import the new Groq tool

export interface ToolProps {
  uiStream: ReturnType<typeof createStreamableUI>;
  fullResponse: string;
}

export const getTools = ({ uiStream, fullResponse }: ToolProps) => {
  const tools: any = {
    search: searchTool({
      uiStream,
      fullResponse
    }),
    retrieve: retrieveTool({
      uiStream,
      fullResponse
    })
  };

  if (process.env.SERPER_API_KEY) {
    tools.videoSearch = videoSearchTool({
      uiStream,
      fullResponse
    });
  }

  if (process.env.GROQ_API_KEY) {
    tools.groq = getGroqResponse({
      uiStream,
      fullResponse
    });
  }

  return tools;
};
