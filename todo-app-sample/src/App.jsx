import React from 'react';
import ToDoHeader from './component/ToDoHeader';
import ToDoEditor from './component/ToDoEditor';
import ToDoList from './component/ToDoList';
import './component/ToDoApp.css';

function App() {
  // Mock data matching the todo-ui.png layout
  const mockTodos = [
    { text: '리액트의 기초 알아보기', checked: true },
    { text: '컴포넌트 스타일링해 보기', checked: true },
    { text: '일정 관리 앱 만들어 보기', checked: false }
  ];

  return (
    <div className="todo-app-container">
      <ToDoHeader />
      <ToDoEditor />
      <ToDoList todos={mockTodos} />
    </div>
  );
}

export default App;
