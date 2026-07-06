import { useState } from "react";
import Todo from "./Todo";

function EventHandler2() {
    const todos =  [
        {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        },
        {
            "userId": 1,
            "id": 2,
            "title": "quis ut nam facilis et officia qui",
            "completed": false
        },
        {
            "userId": 1,
            "id": 3,
            "title": "fugiat veniam minus",
            "completed": false
        },
        {
            "userId": 1,
            "id": 4,
            "title": "et porro tempora",
            "completed": true
        },
        {
            "userId": 1,
            "id": 5,
            "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
            "completed": false
        }
    ]

    const [currentTodo, setCurrentTodo] = useState(todos[0])

    return (
        <>
            <table>
                <tr>
                    <td style={ {textAlign: 'left'} }>
                        {
                            todos.map((todo) => {
                                return (
                                     <h2 key={ todo.id }
                                     onClick={ () => setCurrentTodo(todo) }
                                > { todo.title } </h2>
                                )
                            })
                        }
                    </td>
                    <td>
                        <Todo todo = {currentTodo}/>
                    </td>
                </tr>
            </table>
        </>
    );

}

export default EventHandler2;
