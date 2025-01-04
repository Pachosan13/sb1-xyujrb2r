import type { AIAnalysis } from '../types';

export function validateAnalysis(analysis: any): AIAnalysis {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return {
    fecha: analysis.fecha || currentDate,
    monto: typeof analysis.monto === 'number' ? analysis.monto : 0,
    impuestos: typeof analysis.impuestos === 'number' ? analysis.impuestos : 0,
    categoria: analysis.categoria || 'otros',
    comercio: analysis.comercio || 'Comercio no identificado',
    descripcion: analysis.descripcion || '',
    ruc: analysis.ruc || '',
    servicios: analysis.servicios || ''
  };
}

export function validateText(text: string): void {
  if (!text.trim()) {
    throw new Error('El texto del documento está vacío');
  }
}