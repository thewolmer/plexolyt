import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />;
}

export { Skeleton };

export const SVGSkeleton = ({ className }) => <svg className={className + ' animate-pulse rounded-md bg-primary/10'} />;
