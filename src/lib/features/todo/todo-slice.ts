import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TStatus = "todo" | "in-progress" | "done";
type TodoState = Array<{
  id: string;
  name: string;
  description?: string;
  status: TStatus;
}>;

const initialState: TodoState = [];
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ name: string; description?: string }>
    ) => {
      console.log(action.payload);
      const newTodo = {
        id: crypto.randomUUID(),
        name: action.payload.name,
        description: action.payload.description ?? "",
        status: "todo" as TStatus,
      };
      state.push(newTodo);
    },
    updateTodoStatus: (
      state,
      action: PayloadAction<{ id: string; status: TStatus }>
    ) => {
      if (state.find((todo) => todo.id === action.payload.id)) {
        state.find((todo) => todo.id === action.payload.id)!.status =
          action.payload.status;
      }
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, updateTodoStatus, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
