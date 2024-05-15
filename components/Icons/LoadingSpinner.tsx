import { cn } from '@/lib/utils';

export const LoadingSpinner = (props: React.SVGProps<SVGSVGElement>, className: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={'currentColor'}
    fill={'none'}
    {...props}
    className={cn('animate-spin', className)}
  >
    <path d="M12 3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 18V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21 12L18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 12L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18.3635 5.63672L16.2422 7.75804" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.75706 16.2422L5.63574 18.3635" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18.3635 18.3635L16.2422 16.2422" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.75706 7.75804L5.63574 5.63672" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
