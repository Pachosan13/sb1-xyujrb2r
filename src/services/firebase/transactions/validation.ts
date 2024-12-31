import type { TransactionFormData } from '../../../types/transaction';
import { validateAmount, validateRequired, validateDate } from '../../../utils/validation';

export function validateTransaction(data: TransactionFormData): void {
  const errors: string[] = [];

  if (!validateAmount(data.amount.toString())) {
    errors.push('El monto debe ser un número válido mayor a 0');
  }
  if (!validateRequired(data.description)) {
    errors.push('La descripción es requerida');
  }
  if (!validateRequired(data.category)) {
    errors.push('La categoría es requerida');
  }
  if (!validateRequired(data.subcategory)) {
    errors.push('La subcategoría es requerida');
  }
  if (!validateDate(data.date)) {
    errors.push('La fecha es inválida');
  }

  if (errors.length > 0) {
    throw new Error(errors.join('. '));
  }
}