import { Button, Checkbox, Space } from 'antd';
import React, { useEffect } from 'react';
import { Todo } from '../../App';

interface FooterProps {
  todos: Todo[];
  checkAll: (done: boolean) => void;
  clearAll: () => void;
}

const Footer: React.FC<FooterProps> = (Props) => {
  const { todos } = Props;
  const [total, setTotal] = React.useState(3);
  const [finished, setfinished] = React.useState(2);

  function checkAll(event: any) {
    Props.checkAll(event.target.checked);
  }

  function clearAll() {
    Props.clearAll();
  }

  //todos更新时调用
  useEffect(() => {
    let total = todos.length;
    let finished = 0;
    for (var i in todos) {
      if (todos[i].done) finished++;
    }
    setfinished(finished);
    setTotal(total);
  }, [todos]);

  return (
    <Space size={300}>
      <label>
        <Checkbox
          checked={finished === total && total !== 0 ? true : false}
          onChange={checkAll}
        ></Checkbox>
        <span>
          <span>已完成{finished}</span> / 全部{total}
        </span>
      </label>

      <Button type="primary" onClick={clearAll}>
        清除已完成任务
      </Button>
    </Space>
  );
};

export default Footer;
