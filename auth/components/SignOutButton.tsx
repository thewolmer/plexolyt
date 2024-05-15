'use client';

import { signOut } from '@/auth';
import { SignOutIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';

export const SignOutButton = () => (
  <Button onClick={() => signOut()} size={'icon'}>
    <SignOutIcon />
  </Button>
);
