import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/List/List';
import './App.css';
import { Col, List, Row } from 'antd';
import axios from 'axios';

//Todo数据类型
export interface Todo {
  id: string;
  name: string;
  done: boolean;
}

//初始化数组
const initialTodos: Todo[] = [
  // { id: '1', name: '吃饭', done: true },
  // { id: '2', name: '睡觉', done: false },
  // { id: '3', name: '敲代码', done: true },
];

export default function App() {
  const [todos, setTodos] = React.useState(initialTodos);

  //增加事项
  const addTodo = (name: string) => {
    axios
      .post('http://localhost:9090/v1/add', {
        name: name,
      })
      .then(
        (response) => {
          let task: Todo;
          task = { id: response.data.ID, name: name, done: false };
          let newTodo = [...todos, task];
          setTodos(newTodo);
        },
        (error) => {
          console.log(error);
        },
      );
  };

  //删除事项
  const deleteTodo = (id: string) => {
    axios
      .post(`http://localhost:9090/v1/delete`, {
        id: id,
      })
      .then(
        (error) => {
          console.log(error);
        },
      );
  };

  //更新事项
  const updateTodo = (id: string, checked: boolean) => {
    axios
      .post(`http://localhost:9090/v1/update`, {
        id: id,
        status: checked ? 1 : 0,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
      );

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
    for (let i = 0; i < todos.length; i++) {
      updateTodo(todos[i].id, done);
    }

    const newTodo = todos.map((todo) => {
      return { ...todo, done };
    });
    setTodos(newTodo);
  };

  //清空已完成事项
  const clearAll = () => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].done) {
        deleteTodo(todos[i].id);
      }
    }
    console.log(todos);

    const newTodo = todos.filter((todo) => {
      return todo.done !== true;
    });
    setTodos(newTodo);
  };

  useEffect(() => {
    axios.get('http://localhost:9090/v1/find').then(
      (response) => {
        let newTodo: Todo[] = new Array(response.data.length);
        for (let i = 0; i < response.data.length; i++) {
          newTodo[i] = {
            id: response.data[i].ID,
            name: response.data[i].Name,
            done: response.data[i].Status === 1 ? true : false,
          };
        }
        setTodos(newTodo);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <>
      <Row align="middle">
        <Col span={12} offset={6}>
          <List
            style={{ width: '600px' }}
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
          />
        </Col>
      </Row>
    </>
  );
}
