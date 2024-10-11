import { save } from '@/actions/books';
import { type Book, books } from '../bookdata';

type Params = {
  params: { bookId: string };
};

export function GET(req: Request, { params: { bookId } }: Params) {
  const book = books.find(({ id }) => id === +bookId);
  return Response.json(book);
}

export function DELETE(req: Request, { params: { bookId } }: Params) {
  const idx = books.findIndex((book) => book.id === +bookId);
  if (idx === -1) Response.json({ message: 'Not Found', code: '404' });
  books.splice(idx, 1);
  return Response.json({ message: 'Ok', code: '200' });
}

export async function PATCH(req: Request, { params: { bookId } }: Params) {
  const { title, writer }: { title: string; writer: string } =
    (await req.json()) as Book;
  const book = books.find(({ id }) => id === +bookId);
  if (!book) return Response.json({ message: 'Not Found', code: '404' });

  book.title = title;
  book.writer = writer;

  save(+bookId, book.title, book.writer);

  return Response.json({ message: 'Ok', code: '200' });
}
