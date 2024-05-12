import { User as AuthUser } from '@auth/core/types';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { admins } from '@/admins';

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials, request): Promise<AuthUser | null> {
        const { email, password } = credentials;
        const user = admins.find((admin) => admin.email === email);
        if (!user) {
          return null;
        }
        if (user.password !== password) {
          return null;
        }
        const authUser: AuthUser = {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
        return authUser;
      },
    }),
  ],
  basePath: '/api/auth',
  secret: process.env.AUTH_SECRET,
};
