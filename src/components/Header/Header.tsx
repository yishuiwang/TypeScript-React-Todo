import { Col, Input, InputRef, Row } from 'antd';
import React from 'react';

interface HeaderProps {
  addTodo: (name: string) => void;
}

const Header: React.FC<HeaderProps> = (Props) => {

  const myRef=React.createRef<InputRef>()

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.target.value.trim() === '') {
      alert('输入不能为空');
      return;
    }
    Props.addTodo(event.target.value);
    // console.log(event.target)
    // event.target.value = '';
  
  }

  return (
        <div className="todo-header">
          <Input ref={myRef} placeholder="请输入你的任务，回车确认"  
            onPressEnter={handleKeyUp} allowClear={true}/>
        </div>
  );
};

export default Header;
