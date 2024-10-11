import { getBook } from '@/actions/books';
import { type Book } from '@/app/api/books/bookdata';
import DelBook from '@/components/DelBook';
import { Button } from '@/components/UI/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function Book({ params: { bookId } }: { params: { bookId: string } }) {
  const book = getBook(+bookId);
  if (!book) return notFound();

  return (
    <div className='mx-3 space-y'>
      <div className='flex justify-between border-b-2 border-slate-200'>
        BookId: <strong>{bookId}</strong>
      </div>
      <div className='flex justify-between border-b-2 border-slate-200'>
        Book title: <strong>{book.title}</strong>
      </div>
      <div className='flex justify-between border-b-2 border-slate-200'>
        Book writer: <strong>{book.writer}</strong>
      </div>

      <div className='text-right space-x-4'>
        <DelBook id={1} />
        <Link href={`/books/${bookId}/edit`}>
          <Button variant={'outline'}>Edit</Button>
        </Link>
      </div>
    </div>
  );
}

export default Book;
