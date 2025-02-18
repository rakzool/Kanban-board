import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./Reducers/BoardSlice";

const store = configureStore({
    reducer:{
      board: boardSlice,
    }
});

export default store;