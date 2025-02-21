import React,{useState} from "react";
import "../styles/TaskCard.css";
import { useDrag } from "react-dnd";
import TaskDialog from "./TaskDialog";

// add functionality to add comments 
const TaskCard = ({ task }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handelClick = () => {
    if(!isDragging){
      setIsDialogOpen(true);
    }
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <>
      <div
        ref={drag}
        className={"task-card"}
        onClick={handelClick}
        style={{ 
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move'
        }}
      >
        <h3>{task.title}</h3>
        {task.description && <p className="task-preview">{task.description.substring(0, 60)}...</p>}
        {task.comments?.length > 0 && (
          <div className="comment-count">
            💬 {task.comments.length}
          </div>
        )}
      </div>

      {isDialogOpen && (
        <TaskDialog
          task={task}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  )
}

export default TaskCard;