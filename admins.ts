export interface User {
  id: number;
  name: string;
  email: string;
  role: 'OWNER' | 'DEVELOPER' | 'TESTER';
  password: string;
}

export const admins: User[] = [
  {
    id: 1,
    name: 'Karan',
    email: 'test@test.com',
    role: 'TESTER',
    password: '123',
  },
  {
    id: 2,
    name: 'Wol',
    email: 'test2@test.com',
    role: 'DEVELOPER',
    password: '123',
  },
];
