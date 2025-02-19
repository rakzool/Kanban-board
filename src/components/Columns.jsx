import React from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import Classes from "../styles/column.module.css";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { moveTask } from "../store/Reducers/BoardSlice";

// dispatch(moveTask({taskID : item.id, newColumnID: column.id}))
const Columns = ({column,key}) => {
  const dispatch = useDispatch();

  const [{isOver},drop] = useDrop(() => ({
    accept: "TASK",
    drop : (item)=> dispatch(moveTask({taskID : item.id, newColumnID: column.id})),
    collect : (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))
 return (
   <div className={Classes.mainWrapper} ref={drop} style={{backgroundColor: isOver? "#dfe1e6" :"#F5F5F7"}}>
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
    <TaskForm columnID ={column.id} />

   </div>
 )
}


export default Columns