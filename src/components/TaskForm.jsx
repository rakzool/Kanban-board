import React from "react";
import { useState } from "react";
import Classes from "../styles/TaskForm.module.css";

const TaskForm = () => {
    const [title,setTitle] = useState("");

    // add discription to the card of the task 
    // status add it here

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!title.trim()){
            return
        }
        console.log(title);
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