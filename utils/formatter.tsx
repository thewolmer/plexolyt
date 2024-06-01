import { format, formatDistance } from 'date-fns';

import { ToolTip } from '@/components/ui/ToolTip';

export const formatCurrency = (value: number | string) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(Number(value));

export const formatDate = (date: string | Date) => {
  // Remove the $D prefix if it exists
  const cleanDate = typeof date === 'string' ? (date.startsWith('$D') ? date.slice(2) : date) : date;

  // Parse the date
  const datetime = new Date(cleanDate);

  // Check if the date is valid
  if (isNaN(datetime.getTime())) {
    return 'Invalid date';
  }

  // Format the date
  return format(datetime, 'PPpp');
};

export const formatRelatedDate = (date: Date) => (
  <ToolTip content={format(date, 'PPpp')}>
    <span className="capitalize">{formatDistance(date, new Date(), { addSuffix: true })}</span>
  </ToolTip>
);
