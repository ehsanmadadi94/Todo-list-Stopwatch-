import { useContext, useEffect, useState } from "react";
import DeleteIcon from "./Icons/DeleteIcon";
import EditIcon from "./Icons/EditIcon";
import { TodoContext } from "../Contexts/TodoContext";
import { toast } from "react-toastify";

export default function TodoListItem({todo }) {
    const {todoDispatcher} = useContext(TodoContext)
    const [editMode , setEditMode]=useState(false)

    const UpdateTodos = async(state)=>{
        let url = 'https://67715df42ffbd37a63cee29e.mockapi.io/todos'+'/'+state
        try {
            let res = await fetch(url,{
                method: 'DELETE',
                headers: {'content-type':'application/json'},
            });
            let todosToDelete = await res.json();
            if(res.ok){
                todoDispatcher({
                    type:'delete',
                    id:state
                })
                toast.success('todo deleted!')
            }else{
                toast.error('Error while retrieving list.')
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const ChangeStatus=async(changeStaus)=>{

        // let TodosChangesStatus=todos.map((todoItem)=>{
        //     if(changeStaus.id===todoItem.id){
        //         todoItem.status=!todoItem.status
        //     }
        //     return todoItem
        // })
        // setTodos(TodosChangesStatus);
        let url = 'https://67715df42ffbd37a63cee29e.mockapi.io/todos'+'/'+changeStaus.id;
        try {
            let res = await fetch(url,{
                method:'put',
                headers: {'content-type':'application/json'},
                body:JSON.stringify({status:!changeStaus.status})
            })
            let todoData=await res.json();
            if(res.ok){
                todoDispatcher({
                    type: 'toggle',
                    id:changeStaus.id
                })
                toast.success("Done!")
            }else{
                toast.error('Error while retrieving list.')
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const editTodoTitleHandler=async(todo,newTitle)=>{
        // let newTodos=todos.map((todoItem)=>{
        //     if(todoItem.id===todo.id){
        //         todoItem.title=newTitle;
        //         return todoItem
        //     }

        // })
        // setTodos(newTodos);
        let url = 'https://67715df42ffbd37a63cee29e.mockapi.io/todos'+'/'+todo.id;
        try {
            let res = await fetch(url,{
                method:'put',
                headers: {'content-type':'application/json'},
                body:JSON.stringify({title:newTitle})
            })
            let todoData=await res.json();
            if(res.ok){
                todoDispatcher({
                    type : 'edit',
                    id: todo.id,
                    newTitle: newTitle
                })
                toast.success('Todo title changed.')
            }else{
                toast.error('Error while retrieving list.')
            }
        } catch (error) {
            toast.error(error)
        }

    }

    const changeTodoHandler=()=>{
        UpdateTodos(todo?.id)

    }

    const editTodoHandler=(event)=>{
        if(event.key === 'Enter'){
            editTodoTitleHandler(todo, event.target.value)
            setEditMode(false)
        }
    }
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
                        <input  type="checkbox" checked={todo?.status} onChange={()=>{}} onClick={()=>ChangeStatus(todo)} className="" />
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
