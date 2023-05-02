

import React from 'react'
import { ITask } from '@/types/tasks';
import Tasks from './Tasks';

// interface to hold the tasks in a array from the ITask interface 
interface TodoListProps {
  tasks: ITask[]
}

// funtion to create the table to hold the tasks 
const TodoList: React.FC<TodoListProps> = ({ tasks }) =>  {
  return (
    <div className="overflow-x-auto">
    <table className="table w-full">
     
      <thead>
        <tr>
          <th>Tasks</th>
          <th>Actions</th>
        </tr>
      </thead>
    
      <tbody>
        {/* iterates over the tasks object/array to get all the tasks in the ITasks array */}
        { tasks.map((task) => (
          // calls the Tasks component into the table with a key for the id and task for the text
        <Tasks key={task.id} task={task} />
       
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default TodoList