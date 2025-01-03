export const AI_CONFIG = {
  GEMINI: {
    API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
    MODEL: 'gemini-1.5-flash'
  },
  OPENAI: {
    API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    MODEL: 'gpt-4o'
  }
};