import Todos from "./Components/Todos"
import { ToastContainer, toast } from 'react-toastify';
import {UserContext} from './Contexts/UserContext'

function App() {
 let user = {name:'ehsan madadi'}

 console.log('here is a' + user.name)

  return (
    <>
      <div className="bg-gray-100">
      <UserContext.Provider value={user}>
      <Todos />
      </UserContext.Provider >
    </div>
    </>
  )
}

export default App
