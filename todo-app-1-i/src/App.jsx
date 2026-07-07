import ToDoHeader from './component/ToDoHeader'
import ToDoEditor from './component/ToDoEditor'
import ToDoList from './component/ToDoList'
import './App.css'

function App() {
  // Static draft data matching todo-ui2.png layout

  return (
    <div className="todo-container">
      <div className="todo-card">
        {/* 제목 영역 */}
        <ToDoHeader />
        {/* 등록  */}
        <ToDoEditor />
        {/* 목록 */}
        <ToDoList />
      </div>
    </div>
  )
}

export default App
