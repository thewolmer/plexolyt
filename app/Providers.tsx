'use client';
import { ReactNode } from 'react';

import { ThemeProvider } from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';

const Providers = ({ children }: { children: ReactNode }) => (
  <>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster richColors />
      {children}
    </ThemeProvider>
  </>
);

export default Providers;
