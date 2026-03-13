// This file contains small shared helpers used across apps and packages.
export const formatCurrency = (value) => new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2
}).format(value);
export const classNames = (...values) => values.filter(Boolean).join(' ');
export const wait = (duration) => new Promise((resolve) => {
    window.setTimeout(resolve, duration);
});
