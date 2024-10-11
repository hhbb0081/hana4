import { ReactNode } from 'react';

function ParallelLayout({
  children,
  login,
  profile,
}: {
  children: ReactNode;
  login: ReactNode;
  profile: ReactNode;
}) {
  return (
    <>
      <h1 className='text-2xl'>Parallel Layout</h1>
      <div>
        <div>{login}</div>
        <div>{profile}</div>
      </div>
      {children}
    </>
  );
}

export default ParallelLayout;
