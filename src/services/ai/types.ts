export interface AIProvider {
  analyzeReceipt(text: string): Promise<any>;
  chat(prompt: string, context?: string): Promise<string>;
}

export interface AIAnalysis {
  fecha: string;
  monto: number;
  impuestos: number[];
  categoria: string;
  comercio: string;
  ruc: string;
  descripcion: string;
  servicios: string[];
}