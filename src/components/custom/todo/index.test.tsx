import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { TodoComponent } from "@/components/custom/todo/index";
import { useGetTodosQuery } from "@/lib/services/todos";

import { MockStore } from "redux-mock-store";
import { RootState } from "@/lib/store";
import { AnyAction } from "@reduxjs/toolkit";
jest.mock("@/lib/services/todos", () => ({
  useGetTodosQuery: jest.fn(),
}));

const mockStore = configureStore<Partial<RootState>, AnyAction>([]);

describe("TodoComponent", () => {
  let store: MockStore<Partial<RootState>>;

  it("should show the loading state", () => {
    (useGetTodosQuery as jest.Mock).mockReturnValue({ isLoading: true });
    store = mockStore({ todo: { ids: [], entities: {}, filter: "all" } });

    render(
      <Provider store={store}>
        <TodoComponent />
      </Provider>,
    );

    expect(screen.getAllByRole("status")[0]).toBeInTheDocument();
  });

  it("should show the empty state", () => {
    (useGetTodosQuery as jest.Mock).mockReturnValue({ isLoading: false });
    store = mockStore({ todo: { ids: [], entities: {}, filter: "all" } });

    render(
      <Provider store={store}>
        <TodoComponent />
      </Provider>,
    );

    expect(
      screen.getByText("No todos found. Please add some todos."),
    ).toBeInTheDocument();
  });

  it("should render the list of todos", () => {
    (useGetTodosQuery as jest.Mock).mockReturnValue({ isLoading: false });
    const todos = {
      1: { userId: 1, id: 1, title: "Todo 1", completed: false },
      2: { userId: 1, id: 2, title: "Todo 2", completed: true },
    };
    store = mockStore({
      todo: { ids: [1, 2], entities: todos, filter: "all" },
    });

    render(
      <Provider store={store}>
        <TodoComponent />
      </Provider>,
    );

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });
});

