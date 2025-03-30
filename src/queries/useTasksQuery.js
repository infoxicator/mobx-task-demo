import { useQuery } from '@tanstack/react-query';

export const tasksQuery = {
  queryKey: ['tasks'],
  queryFn: () => getTasks(),
}

export const useTasksQuery = () => {
  return useQuery(tasksQuery);
};

const getTasks = async () => {
  const response = await fetch('https://90bf53dd-5e74-41e8-981b-582761ab9b5d.mock.pstmn.io/get-todos');
  return response.json();
};
