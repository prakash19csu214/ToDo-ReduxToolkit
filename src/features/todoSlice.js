import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [
      {
        id: nanoid(),
        text: "Hello World",
      },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });
    },
    updateTodo: (state, action) => {
      const indexOfTodo = state.todos.findIndex(
        (e) => e.id === action.payload.id
      );
      if (indexOfTodo !== -1) {
        state.todos[indexOfTodo] = action.payload;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
