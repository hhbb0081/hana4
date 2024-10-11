'use client';

import { Input } from '@/components/UI/input';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import { type Book } from '../api/books/bookdata';

const BASE_URL = 'http://localhost:3000/api/books';

function Books() {
  const [books, setBooks] = useState<Book[]>();
  const [searchStr, setSearchStr] = useState('');

  useLayoutEffect(() => {
    (async function () {
      const books = ((await fetch(BASE_URL).then((res) => res.json())) ||
        []) as Book[];
      setBooks(books);
    })();
  }, []);

  // const search = () => {};

  return (
    <>
      <h1 className='text-2xl'>My Book</h1>

      <Input
        onChange={(e) => setSearchStr(e.target.value)}
        placeholder='title or writer...'
      />
      <div className='grid grid-cols-2 gap-3'>
        {books?.length ? (
          <ul className='x'>
            {books
              .filter(
                ({ title, writer }) =>
                  title.includes(searchStr) || writer.includes(searchStr)
              )
              .map(({ id, title }) => (
                <li key={id}>
                  <Link href={`/books/${id}`}>{title}</Link>
                </li>
              ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Books;
