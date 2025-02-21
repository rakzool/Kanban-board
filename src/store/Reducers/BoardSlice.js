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
            const { columnId, title,taskId,description } = action.payload;
            const column = state.columns.find((col) => col.id == columnId);
            if (column) {
                const taskExists = column.tasks.some(task => task.id === taskId);
                if(!taskExists){
                    column.tasks.push({ id:taskId, title , description });
                }
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
        },

        addComment: (state, action) => {
            const { taskId, comment, commentId, timestamp } = action.payload;
            
            state.columns.forEach((column) => {
              const task = column.tasks.find((t) => t.id === taskId);
              if (task) {
                if (!task.comments) {
                  task.comments = [];
                }
                // Check if comment already exists
                const commentExists = task.comments.some(c => c.id === commentId);
                if (!commentExists) {
                  task.comments.push({
                    id: commentId,
                    text: comment,
                    timestamp
                  });
                }
              }
            });
          }

    }
});

export const { addTask, moveTask , addComment} = boardSlice.actions;

export default boardSlice.reducer;