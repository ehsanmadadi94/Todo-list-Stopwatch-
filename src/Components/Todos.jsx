import { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";
import Stopwatch from "./Stopwatch";


export default function Todos() {
    const [todoMode , setTodoMode] = useState(true)

    const [ todos , setTodos ] = useState([]);

    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem('Todo_List'))?? [])
    },[])



    const UpdateTodos = (state)=>{
        let deletestate=[]
        deletestate = todos.filter((item)=>item.id!==state)
        setTodos(deletestate)
    }
    // console.log(todos)
    const ChangeStatus=(changeStaus)=>{
        let TodosChangesStatus=todos.map((todoItem)=>{
            if(changeStaus.id===todoItem.id){
                todoItem.status=!todoItem.status
            }
            return todoItem
        })
        setTodos(TodosChangesStatus);
    }
    const editTodoTitleHandler=(todo,newTitle)=>{
        let newTodos=todos.map((todoItem)=>{
            if(todoItem.id===todo.id){
                todoItem.title=newTitle;
            }
            return todoItem
        })
        setTodos(newTodos);
    }


    const ToggleMode=()=>{
        todoMode ? setTodoMode(false) : setTodoMode(true);
        console.log('mode is now '+ todoMode)
    }





    const addNewTodoHandler = (TodoTitle) => {
        setTodos([
            ...todos,
            {
                id:uuidv4(),
                title : TodoTitle,
                status : false,
            }
        ])

    }
    useEffect(()=>{
        localStorage.setItem('Todo_List', JSON.stringify(todos))
    },[todos])

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
