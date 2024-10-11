type Params = {
  params: {
    time: string;
  };
  searchParams: {
    q: string;
  };
};

function Time({ params: { time }, searchParams: { q } }: Params) {
  return (
    <div className='capitalize'>
      Good {time}! - Comment:{' '}
      <span className='text-red-500 font-bold'>{q}</span>
    </div>
  );
}

export default Time;
