import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const { pathname, searchParams, host } = req.nextUrl;
  return NextResponse.json({
    pathname,
    host,
    q: searchParams.get('q'),
    ip: req.ip || '127.0.0.1',
    cookies: req.cookies.getAll(),
  });
}
