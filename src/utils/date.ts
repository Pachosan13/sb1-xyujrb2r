export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString();
}

export function getCurrentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

export function getMonthRange(month: string) {
  return {
    startDate: `${month}-01`,
    endDate: `${month}-${new Date(month + '-01').getDate()}`
  };
}