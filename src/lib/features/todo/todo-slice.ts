import { todosApi } from "@/lib/services/todos";
import { RootState } from "@/lib/store";
import { TFilterStatus, TTodo } from "@/types/todos";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
interface TodoState extends ReturnType<typeof todoAdapter.getInitialState> {
  filter: TFilterStatus;
}
const todoAdapter = createEntityAdapter<TTodo>();
const initialState: TodoState = {
  ...todoAdapter.getInitialState(),
  filter: "all",
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: {
      prepare: (title: string) => ({
        payload: { id: Date.now(), title, completed: false } as TTodo,
      }),
      reducer: todoAdapter.addOne,
    },
    toggleStatus: (state, action: PayloadAction<{ id: number }>) => {
      const todo = state.entities[action.payload.id];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setFilter: (state, action: PayloadAction<TFilterStatus>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      todosApi.endpoints.getTodos.matchFulfilled,
      (state, { payload }) => todoAdapter.setAll(state, payload)
    );
  },
});

export const { addTodo, toggleStatus, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
export const { selectAll: selectTodos, selectById: selectTodoById } =
  todoAdapter.getSelectors<RootState>((s) => s.todo);
export const selectFilteredTodos = (state: RootState) => {
  const allTodos = selectTodos(state);
  const filter = state.todo.filter;
  switch (filter) {
    case "active":
      return allTodos.filter((todo) => !todo.completed);
    case "completed":
      return allTodos.filter((todo) => todo.completed);
    default:
      return allTodos;
  }
};
