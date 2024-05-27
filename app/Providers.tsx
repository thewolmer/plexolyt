'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';

import { ThemeProvider } from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';

const Providers = ({ children }: { children: ReactNode }) => (
  <>
    <ProgressBar height="4px" color="#009688" options={{ showSpinner: false }} shallowRouting />
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Toaster richColors position="top-center" />
      {children}
    </ThemeProvider>
  </>
);

export default Providers;
