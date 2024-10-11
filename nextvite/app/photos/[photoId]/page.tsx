'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';
import { getPhoto, Photo } from '@/lib/photos';

function PhotoPage({ params: { photoId } }: { params: { photoId: string } }) {
  const router = useRouter();
  // const { title, url, albumId } = await getPhoto(+photoId);

  // CSR
  const [photo, setPhoto] = useState<Photo>();
  useLayoutEffect(() => {
    (async function () {
      const data = await getPhoto(+photoId);
      setPhoto(data);
    })();
  }, [photoId]);

  const goList = () => {
    router.push('/photos');
  };
  return (
    <>
      {photo && (
        <>
          <h1 className='text-2xl mt-5'>
            #{photo.albumId} - {photo.title}
          </h1>
          <Image
            onClick={goList}
            src={photo.url}
            alt={photo.title}
            width={600}
            height={600}
            loading='lazy'
          />
          <h2 className='text-xl'>{photo.title}</h2>
        </>
      )}
    </>
  );
}

export default PhotoPage;
