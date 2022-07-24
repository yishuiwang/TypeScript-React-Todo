import React from 'react';
import { nanoid } from 'nanoid';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/List/List';
import './App.css';
import { Col, List, Row } from 'antd';

//Todo数据类型
export interface Todo {
  id: string;
  name: string;
  done: boolean;
}

//初始化数组
const initialTodos: Todo[] = [
  { id: '1', name: '吃饭', done: true },
  { id: '2', name: '睡觉', done: false },
  { id: '3', name: '敲代码', done: true },
];

export default function App() {
  const [todos, setTodos] = React.useState(initialTodos);

  //增加事项
  const addTodo = (name: string) => {
    let task: Todo;
    task = { id: nanoid(), name: name, done: false };
    let newTodo = [...todos, task];
    setTodos(newTodo);
  };

  //删除事项
  const deleteTodo = (id: string) => {
    let newTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodo);
  };

  //更新事项
  const updateTodo = (id: string, checked: boolean) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: checked };
      }
      return todo;
    });
    setTodos(newTodo);
  };

  //全选事项
  const checkAll = (done: boolean) => {
    const newTodo = todos.map((todo) => {
      return { ...todo, done };
    });
    setTodos(newTodo);
  };

  //清空事项
  const clearAll = () => {
    const newTodo = todos.filter((todo) => {
      return todo.done !== true;
    });
    setTodos(newTodo);
  };

  return (
    <>
      <Row align="middle">
        <Col span={12} offset={6}>
          <List style={{width:"600px"}}
            //grid={{gutter:2}}
            size="large"
            header={<Header addTodo={addTodo} />}
            footer={
                <Footer todos={todos} clearAll={clearAll} checkAll={checkAll} />
            }
            bordered
            dataSource={todos}
            renderItem={(item) => (
              <Main
                todo={item}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            )}
            //renderItem={item => <List.Item>{item.name}</List.Item>}
          />
        </Col>
      </Row>
    </>
  );
}
