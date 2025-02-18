import React from "react";
import Classes from "../styles/column.module.css";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";


const Columns = ({column}) => {
 return (
   <div className={Classes.mainWrapper}>
   <div className="card-area">
   <h2>{column.title}</h2>
    {
        column.tasks.map((task,index)=>{
         return(
            <TaskCard key={index} task={task} />
         );
        })
    }
   </div>
    <TaskForm />

   </div>
 )
}


export default Columns