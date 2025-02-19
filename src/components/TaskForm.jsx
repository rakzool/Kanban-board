import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Classes from "../styles/TaskForm.module.css";
import { addTask } from "../store/Reducers/BoardSlice";

const TaskForm = ({columnID}) => {
    const [title,setTitle] = useState("");
    const dispatch = useDispatch();

    // add discription to the card of the task 
    // status add it here

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!title.trim()){
            return
        }

        const taskId = Date.now().toString();
        dispatch(addTask({columnID,title,taskId}));
        setTitle("");
    }

    return (
        <form onSubmit={handleSubmit} className={Classes.taskForm}>
            <input
             value ={title}
             onChange = {e => setTitle(e.target.value)}
             placeholder="Task Title"

            />
            <button type="submit" >Add</button>
        </form>
    )
}

export default TaskForm;