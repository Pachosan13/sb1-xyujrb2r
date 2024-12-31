export const AI_CONFIG = {
  GEMINI: {
    API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDUdt-smNaPd0AEdjcYvRJkIpywbWjJAIM',
    MODEL: 'gemini-pro'
  },
  OPENAI: {
    API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    MODEL: 'gpt-4'
  }
};