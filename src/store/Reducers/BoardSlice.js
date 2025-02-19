import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    columns: [
        {
            id: 1,
            title: "To Do",
            tasks: []
        },
        {
            id: 2,
            title: "In Progress",
            tasks: []
        },
        {
            id: 3,
            title: "Done",
            tasks: []
        }
    ]
}

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        addTask: (state, action) => {
            console.log("reducer trigreed")
            const { columnID, title,taskId } = action.payload;
            const column = state.columns.find((col) => col.id === columnID);
            if (column) {
                column.tasks.push({ id:taskId, title });
            }
        },

        moveTask: (state, action) => {
            const {taskID, newColumnID} = action.payload;
            let movedTask = null;

            state.columns.forEach((col) => {
                const taskIndex = col.tasks.findIndex((task) => task.id === taskID);
                const task = col.tasks.find((task) => task.id === taskID);
                if(task){
                    col.tasks.splice(taskIndex,1)[0];
                    movedTask = task
                }
            });

            if(movedTask){
                const newColumn = state.columns.find((col) => col.id === newColumnID);
                if(newColumn) {
                    newColumn.tasks.push(movedTask)
                }
            }
        }

    }
});

export const { addTask, moveTask } = boardSlice.actions;

export default boardSlice.reducer;