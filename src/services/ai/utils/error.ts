export class AIError extends Error {
  constructor(message: string, public provider: string) {
    super(message);
    this.name = 'AIError';
  }
}

export function handleAIError(error: unknown, provider: string): never {
  console.error(`Error en ${provider}:`, error);
  
  if (error instanceof Error) {
    if (error.message.includes('API key')) {
      throw new AIError(`Error de autenticación con ${provider}`, provider);
    }
    throw new AIError(error.message, provider);
  }
  
  throw new AIError(`Error al procesar la solicitud con ${provider}`, provider);
}