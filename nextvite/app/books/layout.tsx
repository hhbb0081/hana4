'use client';

import { useFetch } from '@/hooks/fetch-hook';
import Link from 'next/link';
import { ReactNode } from 'react';
import { type Book } from '../api/books/bookdata';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`;

function BooksLayout({ children }: { children: ReactNode }) {
  // const [books, setBooks] = useState<Book[]>();
  // const [searchStr, setSearchStr] = useState('');

  const { data: books, isLoading, error } = useFetch<Book[]>(BASE_URL);

  if (error) {
    return <div className='text-red-500'>{error.message}</div>;
  }

  return (
    <div className='w-1/2'>
      <h1 className='text-2xl'>My Book Case</h1>
      {/* <Input placeholder='search...' onChange={search} /> */}
      {!isLoading ? (
        <ul className='x'>
          <div className='border p-5'>
            {books?.map(({ id, title }) => (
              <li key={id}>
                <Link href={`/books/${id}`}>{title}</Link>
              </li>
            ))}
          </div>
          <div className='border w-full p-3'></div>
          {children}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default BooksLayout;
