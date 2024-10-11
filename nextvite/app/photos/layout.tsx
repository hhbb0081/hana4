import { ReactNode } from 'react';

function PhotosLayout({
  children,
  viewer,
}: {
  children: ReactNode;
  viewer: ReactNode;
}) {
  return (
    <>
      <h1 className='bg-cyan-200 w-full text-center py-5'>Photos Header...</h1>
      {children}
      <div className='hidden'>{viewer}</div>
    </>
  );
}

export default PhotosLayout;
