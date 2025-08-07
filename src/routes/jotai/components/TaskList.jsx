import React from 'react';
import { useAtomValue } from 'jotai';
import { filteredTasksAtom, searchQueryAtom } from '../atoms';
import SearchForm from './SearchForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const filteredTasks = useAtomValue(filteredTasksAtom);
  const searchQuery = useAtomValue(searchQueryAtom);

  return (
    <div className="task-list">
      <SearchForm />
      <div className="tasks">
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
        {filteredTasks.length === 0 && (
          <div className="no-tasks">
            {searchQuery 
              ? 'No tasks match your search'
              : 'No tasks yet'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList; 