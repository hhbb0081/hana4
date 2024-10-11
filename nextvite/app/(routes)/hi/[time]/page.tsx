type Params = {
  params: {
    time: string;
  };
  searchParams: {
    q: string;
  };
};

export function generateStaticParams() {
  return ['morning', 'afternoon', 'evening', 'night'].map((time) => ({ time }));
}

function Time({ params: { time }, searchParams: { q } }: Params) {
  return (
    <div className='capitalize'>
      Good {time} <span className='text-red-500 font-bold'>{q}</span>
    </div>
  );
}

export default Time;
