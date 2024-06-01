'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-screen place-content-center  px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-destructive/50">500</h1>
        <p className="text-2xl font-bold tracking-tight  sm:text-4xl">Uh-oh!</p>
        <p className="mt-4 text-muted-foreground">An unexpected server error has occurred.</p>
        <Button
          variant="default"
          onClick={() => {
            reset();
          }}
          className="mt-8"
        >
          Try again
        </Button>
        <p className="mx-auto max-w-md px-10 text-xs text-muted-foreground opacity-0">{error.stack}</p>
      </div>
    </div>
  );
}
