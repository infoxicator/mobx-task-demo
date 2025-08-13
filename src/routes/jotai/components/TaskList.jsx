import React from 'react';
import { useAtom } from 'jotai';
import { filteredTaskAtomsAtom, searchQueryAtom, taskAtomsAtom } from '../atoms';
import SearchForm from './SearchForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [filteredTaskAtoms] = useAtom(filteredTaskAtomsAtom);
  const [searchQuery] = useAtom(searchQueryAtom);
  const [, dispatch] = useAtom(taskAtomsAtom);

  return (
    <div className="task-list">
      <SearchForm />
      <div className="tasks">
        {filteredTaskAtoms.map((taskAtom) => (
          <TaskItem 
            key={String(taskAtom)} 
            taskAtom={taskAtom} 
            remove={() => dispatch({ type: 'remove', atom: taskAtom })}
          />
        ))}
        {filteredTaskAtoms.length === 0 && (
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