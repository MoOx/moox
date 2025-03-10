export function formatDate(date: string): string {
  // Implementation needed
  return new Date(date).toLocaleDateString();
}

export function getYearFromDate(date: string): number {
  return new Date(date).getFullYear();
}
