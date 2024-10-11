// lib/auth.ts for google
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Email',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        passwd: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.passwd)
          return null;

        console.log('🚀  credentials:', credentials);
        return null;
      },
    }),
    Google,
  ],

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const didLogin = !!auth?.user;
      console.log(
        '🚀 auth.ts > callbacks > authorized - didLogin:',
        didLogin,
        nextUrl.pathname
      );

      if (nextUrl.pathname.startsWith('/about')) {
        return didLogin;
      }
      if (didLogin) return Response.redirect(new URL('/about', nextUrl));

      return true;
    },
  },
});
