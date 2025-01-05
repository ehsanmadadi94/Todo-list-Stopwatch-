import { useContext, useEffect, useState } from "react";
import DeleteIcon from "./Icons/DeleteIcon";
import EditIcon from "./Icons/EditIcon";
import { UserContext } from "../Contexts/UserContext";

export default function TodoListItem({todo ,update , changeStatus ,editTodo }) {
    const [editMode , setEditMode]=useState(false)
    const changeTodoHandler=()=>{
        update(todo?.id)

    }
    const editTodoHandler=(event)=>{
        if(event.key === 'Enter'){
            editTodo(todo, event.target.value)
            setEditMode(false)
        }
    }
    const user = useContext(UserContext)
    console.log(user)
    user.name ='alo alo alo'
    console.log(user)
    // useEffect(()=>{
    //     console.log(`${todo.title} is created!`)

    //     return (()=>{
    //         console.log(`${todo.title} is deleted!`)
    //     })
    // } ,[])

    return(
        <li className="relative flex items-center justify-between px-2 py-6 border-b">
                    {
                        editMode
                        ? <div className="w-full flex items-center">
                        <input  type="text" defaultValue={todo?.title} onChange={()=>{}} onKeyDown={editTodoHandler}  className="border border-gray-200 w-full rounded p-2 mr-2 " />
                        <DeleteIcon onClick={()=>setEditMode(false)} />
                        </div>
                        : <div className="flex items-center">
                            <div>
                        <input  type="checkbox" checked={todo?.status} onChange={()=>{}} onClick={()=>changeStatus(todo)} className="" />
                        <p  className={`inline-block mt-1 ml-2 text-gray-600 ${todo?.status? 'line-through' : ''}`}>{todo?.title}</p>
                        </div>
                        <button type="button" className="absolute right-0 flex items-center space-x-1" >
                        <EditIcon onClick={()=>setEditMode(true)} />
                        <DeleteIcon onClick={changeTodoHandler}/>
                        </button>
                        </div>
                    }</li>
    )
}
