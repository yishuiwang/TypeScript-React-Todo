import React, { ChangeEvent } from 'react';
import './index.css';

interface HeaderProps {
  addTodo: (name: string) => void;
}

const Header: React.FC<HeaderProps> = (Props) => {
  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    //回车触发且输入不为空
    if (event.code !== 'NumpadEnter') return;
    if (event.target.value.trim() === '') {
      alert('输入不能为空');
      return;
    }
    Props.addTodo(event.target.value);
    event.target.value = '';
  }

  return (
    <div className="todo-header">
      <input
        type="text"
        placeholder="请输入你的任务，回车确认"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default Header;
