import { save } from '@/actions/books';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { redirect } from 'next/navigation';

async function EditBook({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: { bookId },
}: {
  params: { bookId: string };
}) {
  async function saveBook(formData: FormData) {
    'use server';
    const title = formData.get('title') || '';
    const writer = formData.get('writer') || '';
    console.log('🚀 ~ save ~ title:', title, writer);
    if (!title || !writer) return alert('Input title & writer, plz');
    save(+bookId, title as string, writer as string);
    redirect(`/books/${bookId}`);
  }
  return (
    <form action={saveBook} className='space-y-3'>
      <div>
        <Label>Title</Label>
        <Input type='text' name='title' />
      </div>

      <div>
        <Label>writer</Label>
        <Input type='text' name='writer' />
      </div>

      <Button type='submit'>Save</Button>
    </form>
  );
}

export default EditBook;
