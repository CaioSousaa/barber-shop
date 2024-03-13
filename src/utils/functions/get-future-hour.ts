import { parseISO, addHours } from 'date-fns';

export function getFutureHours(date: string): Date {
  const parsedDate = parseISO(date);
  const futureDate = addHours(parsedDate, 1);

  return futureDate;
}
