import { Checkbox, List } from 'antd';
import React from 'react';
import { Todo } from '../../App';

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
        myRef.current.style.display = 'none';
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
    // <div>
    //   <div
    //     onMouseEnter={() => {
    //       handleMouse(true);
    //     }}
    //     onMouseLeave={() => {
    //       handleMouse(false);
    //     }}
    //   >
    //     &ensp;
    //     <label>
    //       <Checkbox checked={done} onChange={handleChange(id)}>
    //         {name}
    //       </Checkbox>
    //     </label>
    //     <button
    //       ref={myRef}
    //       className="btn btn-danger"
    //       style={{ display: 'none' }}
    //       onClick={() => {
    //         handleDelete(id);
    //       }}
    //     >
    //       删除
    //     </button>
    //   </div>
    // </div>
    <h2>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Checkbox checked={done} onChange={handleChange(id)}>
        {name}
      </Checkbox>
    </h2>
  );
};

export default Item;
