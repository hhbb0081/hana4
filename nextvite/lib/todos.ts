const BASE_URL = 'https://jsonplaceholder.typicode.com';

export type Todo = {
  useId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const getTodos = async (userId: number = 1) => {
  const data = await fetch(`${BASE_URL}/todos?userId=${userId}`, {
    cache: 'force-cache',
    next: { revalidate: 5 },
  }).then((res) => res.json());

  return data as Todo[];
};
