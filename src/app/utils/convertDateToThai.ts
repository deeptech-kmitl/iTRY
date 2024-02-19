export function convertDateToThai(date: string) {
  const englishDate = new Date(date);
  const thaiDate = englishDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
  return thaiDate
}