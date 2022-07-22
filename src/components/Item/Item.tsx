import React from 'react';
import { Todo } from '../../App';
import './index.css';

interface ItemProps {
  id: string;
  name: string;
  done: boolean;
  deleteTodo: (name: string) => void;
  updateTodo: (name: string, checked: boolean) => void;
}

const Item: React.FC<ItemProps> = (Props) => {
  const myRef = React.createRef<HTMLButtonElement>();

  function handleMouse(flag: boolean) {
    if (myRef.current) {
      if (flag === true) {
        myRef.current.style.display = 'block';
      } else {
        myRef.current.style.display = 'none';
      }
    }
  }

  function handleChange(id: string) {
    return (event: { target: { checked: boolean } }) => {
      Props.updateTodo(id, event.target.checked);
    };
  }

  function handleDelete(id: string) {
    if (window.confirm('确定删除吗？')) {
      Props.deleteTodo(id);
    }
    return;
  }

  let { id, name, done } = Props;

  return (
    <li
      onMouseEnter={() => {
        handleMouse(true);
      }}
      onMouseLeave={() => {
        handleMouse(false);
      }}
    >
      <label>
        <input type="checkbox" checked={done} onChange={handleChange(id)} />
        <span>{name}</span>
      </label>
      <button
        ref={myRef}
        className="btn btn-danger"
        style={{ display: 'none' }}
        onClick={() => {
          handleDelete(id);
        }}
      >
        删除
      </button>
    </li>
  );
};

export default Item;
