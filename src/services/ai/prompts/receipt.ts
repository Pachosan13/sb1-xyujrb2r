export const RECEIPT_PROMPTS = {
  analyze: `Analiza este recibo y extrae la siguiente información en formato JSON:
  {
    "fecha": "YYYY-MM-DD",
    "monto": number,
    "impuestos": number,
    "categoria": string,
    "comercio": string,
    "descripcion": string
  }
  
  Texto del recibo:`,

  systemRole: `Eres un asistente especializado en analizar documentos financieros.
  Extrae la siguiente información del texto proporcionado y devuélvela en formato JSON:
  
  {
    "fecha": "YYYY-MM-DD",
    "monto": number,
    "impuestos": number,
    "categoria": string,
    "comercio": string,
    "descripcion": string
  }`
};