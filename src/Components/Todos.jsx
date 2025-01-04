import { useEffect, useReducer, useRef, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";
import Stopwatch from "./Stopwatch";
import { ToastContainer, toast } from 'react-toastify';
import todoReducer from "../Reducers/todosReducer";


export default function Todos() {
    const [todoMode , setTodoMode] = useState(true)

    // const [ todos , setTodos ] = useState([]);
    const [todos , todoDispatcher] = useReducer (todoReducer,[])

    const fetchdata = async () => {
        try {
            let res = await fetch('https://67715df42ffbd37a63cee29e.mockapi.io/todos');
            let todos = await res.json();
            if(res.ok){
                todoDispatcher({
                    type: 'initial-todos',
                    todos
                })
                toast.success(`You're ready to go 😉`)
            }else{
                toast.error('Error while retrieving list.')
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(()=>{
        // setTodos(JSON.parse(localStorage.getItem('Todo_List'))?? [])
        fetchdata()
    },[])



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


    const ToggleMode=()=>{
        todoMode ? setTodoMode(false) : setTodoMode(true);
        !todoMode ? toast.success(`You're in Todo mode 📝`) : toast.success(`You're in StopWatch mode ⏱`)
    }





    const addNewTodoHandler = async (TodoTitle) => {
        let newTodo ={
            title : TodoTitle,
            status : false
        }
        try {
            let res = await fetch('https://67715df42ffbd37a63cee29e.mockapi.io/todos',{
                method:'post',
                headers: {'content-type':'application/json'},
                body:JSON.stringify(newTodo)
            })
            let todoData=await res.json();
            // setTodos([
            //     ...todos,
            //     todoData
            // ])
            if(res.ok){
                todoDispatcher({
                    type: 'add',
                    id: todoData ?.id,
                    title : todoData ?. title
                })
                toast.success('New Todo Created!')
            }
        } catch (error) {
            console.log(error)
        }

    }
    // useEffect(()=>{
    //     localStorage.setItem('Todo_List', JSON.stringify(todos))
    // },[todos])

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
            <div className="flex items-center justify-center space-x-4 my-4">
                <button className={`border border-gray-600 p-2 rounded font-bold ${todoMode ? 'bg-red-600' : 'bg-white' } ${todoMode ? 'text-purple-600' : 'text-gray-600' }`} onClick={ToggleMode}>Todo App</button>
                <button className={`border border-gray-600 p-2 rounded font-bold ${!todoMode ? 'bg-red-600' : 'bg-white' } ${!todoMode ? 'text-purple-600' : 'text-gray-600' }`} onClick={ToggleMode}>Stopwatch</button>
            </div>
                {
                    todoMode
                    ? <div>
                    <div className="flex items-center mb-6">
                        <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                    </div>
                    <NewTodoInput  addTodo={addNewTodoHandler}/>
                    <TodoList todos={todos} update={UpdateTodos} changeStatus={ChangeStatus} editTodo={editTodoTitleHandler} />
                    </div>
                    :
                    <Stopwatch />
                }
            </div>
        </div>
    )
}
