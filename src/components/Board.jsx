import React from "react";
import Columns from "./Columns";

import Classes from "../styles/Board.module.css";

const Board = ({ columns }) => {

    return (

        <div className={Classes.bord}>
            {
                columns.map((col) => {
                    return (
                        <div className={Classes.columnStyle}>
                            <Columns column={col} key={col.id} />
                        </div>
                    )
                })
            }
        </div>

    )
}


export default Board;