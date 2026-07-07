import { useTodoStore } from '../store/TodoStore';
import ToDoItem from './ToDoItem';

const ToDoList = () => {
  
  const todos = useTodoStore((state) => state.todos )
  
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <ToDoItem key={index} text={todo.text} checked={todo.checked} />
      ))}
    </div>
  );
};

export default ToDoList;
