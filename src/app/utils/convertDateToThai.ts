
export function convertDateToThai(date: string) {
  const isDateRange = date.includes(' ถึง ');

  if (isDateRange) {
    const [startDate, endDate] = date.split(' ถึง ');
    const thaiStartDate = new Date(startDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    const thaiEndDate = new Date(endDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    return `${thaiStartDate} - ${thaiEndDate}`;
  } else {
    const thaiDate = new Date(date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    return thaiDate;
  }
}