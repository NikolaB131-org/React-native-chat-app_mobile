import { prependZero } from './prependZero';

export function getMessageDate(date: Date, options?: { full?: boolean }): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const miniutes = date.getMinutes();

  const dateNow = new Date();
  const yearNow = dateNow.getFullYear();
  const monthNow = dateNow.getMonth() + 1;
  const dayNow = dateNow.getDate();

  const calculatedDate = `${prependZero(day)}/${prependZero(month)}/${year}`;
  const calculatedTime = `${prependZero(hours)}:${prependZero(miniutes)}`;

  if (year === yearNow && month === monthNow && day === dayNow) {
    return calculatedTime;
  }
  if (options?.full) {
    return `${calculatedDate} ${calculatedTime}`;
  }
  return calculatedDate;
}
