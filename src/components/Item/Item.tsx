import { Checkbox} from 'antd';
import React from 'react';

interface ItemProps {
  id: string;
  name: string;
  done: boolean;
  deleteTodo: (name: string) => void;
  updateTodo: (name: string, checked: boolean) => void;
}

const Item: React.FC<ItemProps> = (Props) => {
  function handleChange(id: string) {
    return (event: { target: { checked: boolean } }) => {
      Props.updateTodo(id, event.target.checked);
    };
  }

  let { id, name, done } = Props;

  return (
    <h2>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Checkbox checked={done} onChange={handleChange(id)}>
        {name}
      </Checkbox>
    </h2>
  );
};

export default Item;
