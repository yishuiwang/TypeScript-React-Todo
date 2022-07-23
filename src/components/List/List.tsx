import { Col, Divider, List, Radio, Row, Space, Table, Typography } from 'antd';
import React from 'react';
import { Todo } from '../../App';
import Item from '../Item/Item';

interface TodoListProps {
  todo: Todo;
  deleteTodo: (name: string) => void;
  updateTodo: (name: string, checked: boolean) => void;
}

const Main: React.FC<TodoListProps> = (Props) => {
  const { todo, deleteTodo, updateTodo } = Props;
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Item
        {...todo}
        key={todo.id}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </Space>
  );
};

export default Main;
