import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Stopwatch from './Components/Stopwatch.jsx'
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <>
    <App />
    <ToastContainer />
    </>
  // </StrictMode>,
)
