export default function todoReducer(todos , action){
    switch (action?.type) {
                case 'initial-todos':
                    return [
                        ... action?.todos
                    ]
                case 'add':
                    return[
                        ...todos,
                        {
                            id:action ?. id,
                            title: action ?. title,
                            status : false
                        }
                    ]
                case 'delete':
                    return todos.filter((item)=>item.id!==action?.id)
                case 'toggle':
                    return todos.map((todoItem)=>{
                        if(todoItem.id === action ?.id){
                            todoItem.status = !todoItem.status
                        }
                        return todoItem
                    })
                case 'edit':
                    return todos.map((todoItem)=>{
                        if(todoItem.id===action?.id){
                            todoItem.title=action ?. newTitle
                        }
                        return todoItem
                    })


                default:
                    return todos;
            }
}
