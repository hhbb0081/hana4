import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { auth } from '@/lib/auth';

export default async function AboutLayout({ children }: PropsWithChildren) {
  const session = await auth();
  console.log('🚀 ~ AboutLayout ~ session:', session);
  return (
    <div className='border p-5'>
      <h1 className='text-2xl'>About Layout: {session?.user?.name}</h1>
      <a href='/about/me'>Me</a>
      <div className='bg-purple-200'>{children}</div>
      <Link href='/api/auth/signout'>Log Out</Link>
    </div>
  );
}
