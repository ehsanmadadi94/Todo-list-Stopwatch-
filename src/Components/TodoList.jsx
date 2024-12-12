import TodoListItem from "./TodoListItem";

export default function TodoList({todos , update , changeStatus , editTodo }) {
    return(
        <ul className="list-reset">

                    {todos.map((todo,index)=><TodoListItem key={index} todo={todo} update={update} changeStatus={changeStatus}  editTodo={editTodo}/>)}
                </ul>
    )
}
