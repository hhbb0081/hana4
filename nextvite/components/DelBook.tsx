'use client';

import { Button } from './UI/button';

type Props = {
  // remove: () => void;
  id: number;
};
function DelBook({ id }: Props) {
  const remove = async () => {
    if (!confirm('Are u sure??')) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`,
      {
        method: 'DELETE',
      }
    ).then((res) => res.json());
    console.log(res);
  };
  return (
    <Button onClick={remove} variant={'destructive'}>
      Del
    </Button>
  );
}

export default DelBook;
