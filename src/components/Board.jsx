import React, { useState } from "react";
import Columns from "./Columns";

import Classes from "../styles/Board.module.css";
import TaskForm from "./TaskForm";

const Board = ({ columns }) => {

    const [isFormOpen, setIsFormOpen] = useState(false);

    return (

        <>
            <div className={Classes.boardHeader}>
                <h1>Kanban Board</h1>
                <button
                    className={Classes.createTaskBtn}
                    onClick={() => setIsFormOpen(true)}
                >
                    Create New Task
                </button>
            </div>
            <div className={Classes.board}>
                {
                    columns.map((col) => {
                        return (
                            <div className={Classes.columnStyle} key={col.id}>
                                <Columns column={col} />
                            </div>
                        )
                    })
                }
            </div>
            {isFormOpen && <TaskForm onClose={()=> setIsFormOpen(false)}/>}
        </>

    )
}


export default Board;