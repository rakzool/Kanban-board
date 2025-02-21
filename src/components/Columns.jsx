import React, { useContext, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import Classes from "../styles/column.module.css";
import TaskCard from "./TaskCard";
import { moveTask } from "../store/Reducers/BoardSlice";
import { WebSocketContext } from "./WebSocketProvider";

const Columns = ({ column }) => {
  const dispatch = useDispatch();
  const socket = useContext(WebSocketContext);

  const handleTaskMove = useCallback((item) => {
    dispatch(moveTask({ taskID: item.id, newColumnID: column.id }));

    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        type: "MOVE_TASK",
        taskId: item.id,
        newColumnID: column.id
      };
      console.log("sending WebSocket message:", message);
      socket.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not available or not open for task move");
    }
  }, [socket, dispatch, column.id]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: handleTaskMove,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [handleTaskMove]);

  return (
    <div className={Classes.mainWrapper} ref={drop} style={{ backgroundColor: isOver ? "#dfe1e6" : "#F5F5F7" }}>
      <div className="card-area">
        <h2>{column.title}</h2>
        {
          column.tasks.map((task, index) => {
            return (
              <TaskCard key={index} task={task} />
            );
          })
        }
      </div>
    </div>
  );
}

export default Columns;