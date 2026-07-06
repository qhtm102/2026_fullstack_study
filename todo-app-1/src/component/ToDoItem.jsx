

const ToDoItem = ({ text, checked }) => {
  return (
    <div className={`todo-item ${checked ? 'completed' : ''}`}>
      <div className="todo-checkbox-wrapper">
        {checked ? (
          <svg className="todo-checkbox checked" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#22b8cf"/>
            <path d="M6 12L10 16L18 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg className="todo-checkbox unchecked" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="3" stroke="#212529" strokeWidth="2.5" fill="none"/>
          </svg>
        )}
      </div>
      <div className="todo-text">{text}</div>
      <button type="button" className="todo-delete-btn">
        <svg className="todo-delete-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#ff6b6b" strokeWidth="2.2" fill="none"/>
          <line x1="8" y1="12" x2="16" y2="12" stroke="#ff6b6b" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

export default ToDoItem;
