import Image from 'next/image';
import { getPhoto } from '@/lib/photos';

async function PhotoInterceptor({
  params: { photoId },
}: {
  params: { photoId: string };
}) {
  const { title, url } = await getPhoto(+photoId);
  return (
    <div className='w-full'>
      <Image src={url} alt={title} width={600} height={600} loading='lazy' />
    </div>
  );
}

export default PhotoInterceptor;
