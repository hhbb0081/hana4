import { type Book, books } from '@/app/api/books/bookdata';

export const getBook = (bookId: number) => {
  return books.find(({ id }) => id === bookId) as Book;
};

export async function save(bookId: number, title: string, writer: string) {
  'use server';
  books.map((book) => {
    if (book.id === +bookId) {
      return {
        bookId,
        title: title,
        writer: writer,
      };
    } else return book;
  });
  console.log('🚀 ~ save ~ title:', title, writer);
}
