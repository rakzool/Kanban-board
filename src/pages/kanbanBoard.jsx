import React from "react";
import Board from "../components/Board";
import { useSelector } from "react-redux";

import "../styles/KanbanBoard.css";

export default function KanbanBoard() {

    const columns = useSelector(state => state.board.columns);

    // const columnNames = ["To-Do","In-Progress","Done"]
    return (
        <div className="page-wrapper">
            <h1 className="page-title">Kanban Board</h1>
            <Board columns={columns} />
        </div>
    )
}