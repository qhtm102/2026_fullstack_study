import React from 'react';

const ToDoEditor = () => {
  return (
    <div className="todo-editor">
      <input 
        type="text" 
        placeholder="할 일을 입력하세요" 
        className="todo-input" 
        readOnly 
      />
      <button type="button" className="todo-add-btn">
        +
      </button>
    </div>
  );
};

export default ToDoEditor;
