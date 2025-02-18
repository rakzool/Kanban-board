import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    columns : [
        {
            id:"to-do",
            title:"To Do",
            tasks:[
                {
                    title : "Creat form component"
                }
            ]
        },
        {
            id:"inprogress",
            title:"In Progress",
            tasks:[]
        },
        {
            id:"done",
            title:"Done",
            tasks:[]
        }
    ]
}

const boardSlice = createSlice({
    name :"board",
    initialState,
    reducers : {
        addTask: (state,action) => {
            const {columnId, title} = action.payload;
            const column = state.columns.find((col) => col.id === columnId);
            if(column) {
                column.tasks.push({id: Date.now().toString, title});
            }
        }
    }
});

export const {addTask} = boardSlice.actions;

export default boardSlice.reducer;