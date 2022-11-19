import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      isAdmin: boolean;
      isVerified: boolean;
    };
  }
}
