import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import './index.css';
import { Todo } from '../../App';
import Item from '../Item/Item';

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (name: string) => void;
  updateTodo: (name: string, checked: boolean) => void;
}

const List: React.FC<TodoListProps> = (Props) => {
  const { todos, deleteTodo, updateTodo } = Props;
  return (
    <ul className="todo-main">
      {todos.map((todo) => {
        return (
          <Item
            {...todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        );
      })}
    </ul>
  );
};

export default List;
