import { parseISO } from 'date-fns';

export function notPermittedHours(date: string): Date | null {
  const parsedDate = parseISO(date);

  const hour = parsedDate.getHours();

  if (hour >= 3 && hour <= 15) {
    return parsedDate;
  } else {
    return null;
  }
}
