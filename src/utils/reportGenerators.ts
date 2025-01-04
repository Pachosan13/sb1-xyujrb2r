import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReportData {
  ingresos: number;
  gastos: number;
  transactions: any[];
}

export async function generatePDFReport(data: ReportData) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Reporte Financiero', 14, 22);
  
  doc.setFontSize(12);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 32);

  autoTable(doc, {
    startY: 40,
    head: [['Fecha', 'Tipo', 'Descripción', 'Monto']],
    body: data.transactions.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.type,
      t.description,
      t.amount.toFixed(2)
    ]),
  });

  doc.save('reporte-financiero.pdf');
}

export async function generateExcelReport(data: ReportData) {
  // TODO: Implement Excel export
  console.log('Excel export not implemented yet', data);
}
