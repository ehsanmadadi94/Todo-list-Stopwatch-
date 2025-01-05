import TodoListItem from "./TodoListItem";
import { useContext } from "react";
import { TodoContext } from "../Contexts/TodoContext";

export default function TodoList() {
   const {todos} = useContext(TodoContext)
    return(
        <ul className="list-reset">

                    {todos.map((todo)=><TodoListItem key={todo.id} todo={todo} />)}
                </ul>
    )
}
