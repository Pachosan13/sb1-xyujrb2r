export function validateAmount(amount: string): boolean {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= 0;
}

export function validateRequired(value: string): boolean {
  if (value === undefined || value === null) {
    return false;
  }
  return value.trim().length > 0;
}

export function validateDate(date: string): boolean {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}