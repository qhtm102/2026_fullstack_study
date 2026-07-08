import {create} from "zustand"

export const useTodoStore = create( 
    (set, get) => ({
     
    todos:[],
    // todos : [
    // {id:'1' , text: '할 일 1', checked: false},
    // {id:'2',  text: '할 일 2', checked: false},
    // {id:'3' ,text: '할 일 3', checked: false},
    // {id:'4' ,text: '할 일 4', checked: false},
    // {id:'5' ,text: '할 일 5', checked: false},
    // {id:'6' ,text: '할 일 6', checked: false},
    // {id:'7' ,text: '할 일 7', checked: false},
    // {id:'8' ,text: '할 일 8', checked: false},
    // {id:'9' ,text: '할 일 9', checked: false},
    // {id:'10' ,text: '할 일 10', checked: false}
    // ]

    addTodo: (text) => set( 
        (state) => ({ todos: [...state.todos, {id: new Date().getTime(), text: text, checked : false }] }) 
    ),

    updateTodo: (id) => set(
        (state) => ({todos: state.todos.map(
            (todo) => todo.id != id ? todo : {...todo, checked : !todo.checked}
        )})
    ),

    deleteTodo: (id) => set(
        (state) => ({todos : state.todos.filter(
            (todo) => todo.id != id 
        )})
    )
}));