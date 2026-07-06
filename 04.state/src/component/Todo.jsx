function Todo( {todo} ) {
    return(
        <>
            <h2>제목 : { todo.title }</h2>        
            <h3>완료여부 : { todo.completed ? "완료" : "진행중" }</h3>        
        </>
    )
}

export default Todo;