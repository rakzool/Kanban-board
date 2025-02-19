import React from "react";
import Columns from "./Columns";

import Classes from "../styles/Board.module.css";

const Board = ({ columns }) => {

    return (

        <div className={Classes.bord}>
            {
                columns.map((col) => {
                    return (
                        <div className={Classes.columnStyle} key={col.id}>
                            <Columns column={col}  />
                        </div>
                    )
                })
            }
        </div>

    )
}


export default Board;