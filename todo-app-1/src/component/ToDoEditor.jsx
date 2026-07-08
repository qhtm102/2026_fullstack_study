import { useState } from 'react';
import { useTodoStore } from '../store/TodoStore';

const ToDoEditor = () => {

  const [text, setText] = useState("");
  const addTodo = useTodoStore( (state) => state.addTodo)

  function checkHandler() {
    addTodo(text);
    setText("");
  }

  return (
    <div className="todo-editor">
      <input 
        type="text" 
        placeholder="할 일을 입력하세요" 
        className="todo-input" 
         value={text}
         onChange={(event) => setText(event.target.value) }
      />
      <button type="button" className="todo-add-btn" onClick={ checkHandler }>
        +
      </button>
    </div>
  );
};

export default ToDoEditor;
