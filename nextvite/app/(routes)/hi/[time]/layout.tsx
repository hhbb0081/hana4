import { PropsWithChildren, Suspense } from 'react';

function AboutLayout({ children }: PropsWithChildren) {
  return (
    <div className='border p-5'>
      <h1 className='text-2xl'>About Layout</h1>
      <a href='/about/me'>Me</a>
      <div className='bg-purple-200 text-center'>
        <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
      </div>
    </div>
  );
}

export default AboutLayout;
