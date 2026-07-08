import { useTodoStore } from '../store/TodoStore';
import ToDoItem from './ToDoItem';

// const ToDoList = ({ todos }) => {
//   return (
//     <div className="todo-list">
//       {todos.map((todo, index) => (
//         <ToDoItem key={index} text={todo.text} checked={todo.checked} />
//       ))}
//     </div>
//   );
// };

// export default ToDoList;


// export default function ToDoList () {

//   const todoListItems = useTodoStore((state) => state.todos);
  

// 출력 테스트용
//   return(
//     <>
//        <div>
//         {
//           todoListItems.map((todo) => {
//             return (
//               <>
//                 <div>{todo.id}</div>
//                 <div>{todo.text}</div>
//                 <div> {todo.checked} </div>
//               </>
//             )
//           })}
//        </div>
//     </>
//   )
// }

export default function ToDoList () {

  const todoListItems = useTodoStore((state) => state.todos);
  
  return(
    <>
       <div className="todo-list">
        {
          todoListItems.map((todo) => {
            return (
              <>
                <ToDoItem key={todo.id} todo={todo} />
              </>
            )
          })}
       </div>
    </>
  )
}
