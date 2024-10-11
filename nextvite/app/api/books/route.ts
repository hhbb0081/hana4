import { NextRequest } from 'next/server';
import { books } from './bookdata';

export function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const searchStr = searchParams.get('searchStr');
  let rets = books;

  if (searchStr) {
    rets = books.filter(
      ({ title, writer }) =>
        title.includes(searchStr) || writer.includes(searchStr)
    );
  }

  return Response.json(rets);
}

export async function POST(request: Request) {
  const { title, writer } = await request.json();

  const id = Math.max(...books.map(({ id }) => id), 0) + 1;
  const newer = { id, title, writer };
  books.push(newer);

  return Response.json(newer);
}
