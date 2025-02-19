import React from "react";
import Classes from "../styles/TaskCard.module.css";
import { useDrag } from "react-dnd";

// add functionality to add comments 
const TaskCard = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div className={Classes.cardWrapper} ref={drag} style={{opacity: isDragging ? 0.5 : 1}}>
      <h3 className={Classes.cardTitle}>{task.title}</h3>
      <p className={Classes.classDesc}>{task.desc}</p>
    </div>
  )
}

export default TaskCard;