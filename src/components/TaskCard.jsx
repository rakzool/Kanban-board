import React from "react";

// add functionality to add comments 
const TaskCard = ({key,task}) => {
  return(
    <div>
        Task {task.title}
    </div>
  )
}

export default TaskCard;