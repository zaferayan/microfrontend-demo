// This file contains small shared helpers used across apps and packages.
export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2
  }).format(value);

export const classNames = (...values: Array<string | false | null | undefined>): string =>
  values.filter(Boolean).join(' ');

export const wait = (duration: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
