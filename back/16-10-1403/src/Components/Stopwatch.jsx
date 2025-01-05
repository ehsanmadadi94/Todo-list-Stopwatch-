import { useEffect, useRef, useState } from "react"

export default function Stopwatch() {
   const [time , setTime]=useState(0);
   const[isRunning , setIsRunning]=useState(false);
   useEffect(()=>{
    let interval;
    if(isRunning){
        interval=setInterval(() => {
            setTime(time+1)
        }, 10);
        return () => clearInterval(interval);
    }
   },[time , isRunning])

   const hrs = Math.floor(time / 360000);
  const mins = Math.floor((time % 360000) / 6000);
  const secs = Math.floor((time % 6000) / 100);
  const milSecs=time % 100;

  const StartandStop=()=>{
    setIsRunning(!isRunning)
  }
  const Reset=()=>{
    setTime(0)
  }
    return(
        <div className="">
            <h1 className="mr-6 text-4xl font-bold text-purple-600"> STOPWATCH</h1>
            <div className="text-xl font-bold flex justify-center items-center my-2" >{hrs}:{mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}:{milSecs.toString().padStart(2, "0")}</div>
            <div className="flex items-center justify-center space-x-4 pt-4">
                <button className="border px-4 py-1 bg-gray-100 rounded border-gray-300 font-bold" onClick={StartandStop}>{isRunning? "STOP" : "START"}</button>
                <button className="border px-4 py-1 bg-gray-100 rounded border-gray-300 font-bold" onClick={Reset}>RESET</button>
            </div>
        </div>
    )

}
