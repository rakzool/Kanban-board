import React, { useContext } from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "../styles/taskform.css";
import { addTask } from "../store/Reducers/BoardSlice";
import { WebSocketContext } from "./WebSocketProvider";

const TaskForm = ({ onClose }) => {

    const socket = useContext(WebSocketContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedColumn, setSelectedColumn] = useState("");
    const dispatch = useDispatch();
    const columns = useSelector(state => state.board.columns);

    // add discription to the card of the task 
    // status add it here

     

    const handleSubmit = (event) => {
      event.preventDefault();
    if (!title.trim() || !selectedColumn) return;
    
    const taskId = Date.now().toString();
    
    // First update local state
    dispatch(addTask({ 
      columnId: selectedColumn, 
      title,
      description,
      taskId
    }));
    
    // Then broadcast to other clients
    if (socket) {
      const message = {
        type: "ADD_TASK",
        task: { id: taskId, title, description ,columnID:selectedColumn},
        columnId: selectedColumn
      };
      socket.send(JSON.stringify(message));
    }
    
    // Reset form
    setTitle("");
    setDescription("");
    setSelectedColumn("");
    if (onClose) onClose();
    }

    return (
      <div className="task-form-modal">
      <form onSubmit={handleSubmit} className="task-form">
        <h2>Create New Task</h2>
        
        <div className="form-group">
          <label>Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Column:</label>
          <select 
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            required
          >
            <option value="">Select Column</option>
            {columns.map(column => (
              <option key={column.id} value={column.id}>
                {column.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Create Task</button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
    )
}

export default TaskForm;